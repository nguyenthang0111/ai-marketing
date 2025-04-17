import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductEntity } from './entities/product.entity';
import { UserModule } from '../user/user.module';
import { ProductController } from './product.controller';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    forwardRef(() => ProjectModule),
    forwardRef(() => UserModule),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
