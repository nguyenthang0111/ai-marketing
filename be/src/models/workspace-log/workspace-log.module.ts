import { Module } from '@nestjs/common';
import { WorkspaceLogService } from './workspace-log.service';
import { WorkspaceLogController } from './workspace-log.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceLogEntity } from './entities/workspace-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceLogEntity])],
  controllers: [WorkspaceLogController],
  providers: [WorkspaceLogService],
  exports: [TypeOrmModule],
})
export class WorkspaceLogModule {}
