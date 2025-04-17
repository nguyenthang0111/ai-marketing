import { forwardRef, Module } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceEntity } from './entities/workspace.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { WorkspaceMemberModule } from '../workspace-member/workspace-member.module';
import { CreditCodeModule } from '../credit-code/credit-code.module';
import { ProjectModule } from '../project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkspaceEntity]),
    forwardRef(() => UserModule),
    WorkspaceMemberModule,
    CreditCodeModule,
    forwardRef(() => ProjectModule),
  ],
  controllers: [WorkspaceController],
  providers: [WorkspaceService],
  exports: [TypeOrmModule, WorkspaceService],
})
export class WorkspaceModule {}
