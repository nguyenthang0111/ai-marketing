import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from './entities/document.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentController],
  providers: [DocumentService],
  exports: [TypeOrmModule],
})
export class DocumentModule {}
