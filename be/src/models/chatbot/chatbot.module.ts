import { Module } from '@nestjs/common';
import { ChatbotService } from './chatbot.service';
import { ChatbotController } from './chatbot.controller';
import { ChatbotEntity } from './entities/chatbot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ChatbotEntity])],
  controllers: [ChatbotController],
  providers: [ChatbotService],
  exports: [TypeOrmModule],
})
export class ChatbotModule {}
