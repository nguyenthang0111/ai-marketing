import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { BrandEntity } from './entities/brand.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('brand')
export class BrandController {
  constructor(
    private readonly brandService: BrandService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Get(':brandId') // GET /brand/:brandId
  getOne(@Param('brandId') brandId: string): Promise<BrandEntity> {
    return this.brandService.getOne(brandId);
  }

  @Patch(':brandId') // PATCH /brand/:brandId
  async update(
    @Param('brandId') brandId: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    const brand = await this.brandService.update(brandId, updateBrandDto);
    return { message: 'Brand updated successfully', data: brand };
  }

  @Delete(':brandId') // DELETE /brand/:brandId
  async remove(@Param('brandId') brandId: string) {
    await this.brandService.remove(brandId);
    return { message: 'Brand deleted successfully' };
  }
}
