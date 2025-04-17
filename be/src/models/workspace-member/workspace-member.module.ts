import { Module } from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service';
import { WorkspaceMemberController } from './workspace-member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceMemberEntity } from './entities/workspace-member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceMemberEntity])],
  controllers: [WorkspaceMemberController],
  providers: [WorkspaceMemberService],
  exports: [TypeOrmModule, WorkspaceMemberService],
})
export class WorkspaceMemberModule {}
