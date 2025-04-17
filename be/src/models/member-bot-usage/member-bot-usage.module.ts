import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberBotUsageService } from './member-bot-usage.service';
import { MemberBotUsageController } from './member-bot-usage.controller';
import { MemberBotUsageEntity } from './entities/member-bot-usage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MemberBotUsageEntity])],
  controllers: [MemberBotUsageController],
  providers: [MemberBotUsageService],
  exports: [TypeOrmModule, MemberBotUsageService],
})
export class MemberBotUsageModule {}
