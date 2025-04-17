import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmConfigService {
  constructor(private configService: ConfigService) {}

  get geminiApiKey(): string {
    return this.configService.get<string>('llm.geminiApiKey', '');
  }

  get geminiModel(): string {
    return this.configService.get<string>('llm.geminiModel', '');
  }
}
