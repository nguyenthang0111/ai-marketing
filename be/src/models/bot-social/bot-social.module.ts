import { ProjectModule } from './../project/project.module';
import { Module, forwardRef } from '@nestjs/common';
import { BotSocialService } from './bot-social.service';
import { BotSocialController } from './bot-social.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotSocialEntity } from './entities/bot-social.entity';
import { UserModule } from '../user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([BotSocialEntity]),
    forwardRef(() => ProjectModule),
    forwardRef(() => UserModule),
  ],
  controllers: [BotSocialController],
  providers: [BotSocialService],
  exports: [TypeOrmModule, BotSocialService],
})
export class BotSocialModule {}
