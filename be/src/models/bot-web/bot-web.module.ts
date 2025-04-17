import { Module } from '@nestjs/common';
import { BotWebService } from './bot-web.service';
import { BotWebController } from './bot-web.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BotWebEntity } from './entities/bot-web.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BotWebEntity])],
  controllers: [BotWebController],
  providers: [BotWebService],
  exports: [TypeOrmModule],
})
export class BotWebModule {}
