import { Module, forwardRef } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandEntity } from './entities/brand.entity';
import { ProjectModule } from '../project/project.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandEntity]),
    forwardRef(() => ProjectModule),
    forwardRef(() => UserModule),
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [TypeOrmModule, BrandService],
})
export class BrandModule {}
