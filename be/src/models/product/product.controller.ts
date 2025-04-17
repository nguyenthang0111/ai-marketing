import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { UserService } from '../user/user.service';
import { ProjectService } from '../project/project.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Get(':productId') // GET /product/:productId
  getOne(@Param('productId') productId: string): Promise<ProductEntity> {
    return this.productService.getOne(productId);
  }

  @Patch(':productId') // PATCH /product/:productId
  async update(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productService.update(
      productId,
      updateProductDto,
    );
    return { message: 'Product updated successfully', data: product };
  }

  @Delete(':productId') // DELETE /product/:productId
  async remove(@Param('productId') productId: string) {
    await this.productService.remove(productId);
    return { message: 'Product deleted successfully' };
  }
}
