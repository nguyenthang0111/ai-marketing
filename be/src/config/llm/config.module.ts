import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LlmConfigService } from './config.service';
import llmConfiguration from './configuration';

@Module({
  imports: [ConfigModule.forFeature(llmConfiguration)],
  providers: [ConfigService, LlmConfigService],
  exports: [ConfigService, LlmConfigService],
})
export class LlmConfigModule {}
