import { forwardRef, Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ProjectEntity } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { BrandModule } from '../brand/brand.module';
import { ProductModule } from '../product/product.module';
import { BotSocialModule } from '../bot-social/bot-social.module';
import { MemberBotUsageModule } from '../member-bot-usage/member-bot-usage.module';
import { WorkspaceMemberModule } from '../workspace-member/workspace-member.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    forwardRef(() => UserModule),
    forwardRef(() => WorkspaceModule),
    forwardRef(() => BrandModule),
    forwardRef(() => ProductModule),
    forwardRef(() => BotSocialModule),
    forwardRef(() => MemberBotUsageModule),
    forwardRef(() => WorkspaceMemberModule),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [TypeOrmModule, ProjectService],
})
export class ProjectModule {}
