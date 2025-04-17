import { Module } from '@nestjs/common';
import { LlmConfigModule } from 'src/config/llm/config.module';
import { GeminiController } from './gemini.controller';
import { GeminiService } from './gemini.service';
import { GeminiFlashModelProvider } from './gemini.provider';
import { MemberBotUsageModule } from 'src/models/member-bot-usage/member-bot-usage.module';

@Module({
  imports: [LlmConfigModule, MemberBotUsageModule],
  controllers: [GeminiController],
  providers: [GeminiService, GeminiFlashModelProvider],
})
export class GeminiModule {}
