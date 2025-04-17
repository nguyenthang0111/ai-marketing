import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { Repository } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { ProjectEntity } from '../project/entities/project.entity';

@Injectable()
export class BrandService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
  ) {}

  async create(
    createBrandDto: CreateBrandDto,
    project: ProjectEntity,
    user: UserEntity,
  ): Promise<BrandEntity> {
    await this.checkExistingBrandName(createBrandDto.name, project.projectId);

    const brand = this.brandRepository.create(createBrandDto);
    brand.project = project;
    brand.user = user;

    return this.brandRepository.save(brand);
  }

  getOne(brandId: string): Promise<BrandEntity> {
    return this.brandRepository.findOneByOrFail({ brandId });
  }

  async update(brandId: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.getOne(brandId);
    const newBrandName = updateBrandDto.name;
    if (newBrandName && brand.name != newBrandName)
      await this.checkExistingBrandName(newBrandName, brand.projectId);

    Object.assign(brand, updateBrandDto);
    return this.brandRepository.save(brand);
  }

  async remove(brandId: string) {
    const brand = await this.getOne(brandId);
    return this.brandRepository.remove(brand);
  }

  async checkExistingBrandName(name: string, projectId: string) {
    const existingBrand = await this.brandRepository.exists({
      where: { name, projectId },
    });
    if (existingBrand) {
      throw new ConflictException('Brand name already exists');
    }
  }
}
