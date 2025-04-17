import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { Provider } from '@nestjs/common';
import {
  GEMINI_FLASH_MODEL,
  GENERATION_CONFIG,
  SAFETY_SETTINGS,
} from 'src/common/constants/gemini.constant';
import { LlmConfigService } from 'src/config/llm/config.service';

export const GeminiFlashModelProvider: Provider<GenerativeModel> = {
  provide: GEMINI_FLASH_MODEL,
  useFactory: async (llmConfigService: LlmConfigService) => {
    const genAI = new GoogleGenerativeAI(llmConfigService.geminiApiKey);
    return genAI.getGenerativeModel({
      model: llmConfigService.geminiModel,
      generationConfig: GENERATION_CONFIG,
      safetySettings: SAFETY_SETTINGS,
    });
  },
  inject: [LlmConfigService],
};
