import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { plainToInstance } from 'class-transformer';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProjectEntity } from '../project/entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(
    createProductDto: CreateProductDto,
    project: ProjectEntity,
    user: UserEntity,
  ): Promise<ProductEntity> {
    await this.checkExistingProductName(
      createProductDto.name,
      project.projectId,
    );

    const product = plainToInstance(ProductEntity, createProductDto);
    product.project = project;
    product.user = user;

    return this.productRepository.save(product);
  }

  getOne(productId: string): Promise<ProductEntity> {
    return this.productRepository.findOneByOrFail({ productId });
  }

  async update(productId: string, updateProductDto: UpdateProductDto) {
    const product = await this.getOne(productId);
    const newProductName = updateProductDto.name;
    if (newProductName && product.name != newProductName)
      await this.checkExistingProductName(newProductName, product.projectId);

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async remove(productId: string) {
    const product = await this.getOne(productId);
    return this.productRepository.remove(product);
  }

  async checkExistingProductName(name: string, projectId: string) {
    const existingProduct = await this.productRepository.exists({
      where: { name, projectId },
    });
    if (existingProduct) {
      throw new ConflictException(
        'Product name already exists in this project',
      );
    }
  }
}
