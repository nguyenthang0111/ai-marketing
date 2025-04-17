import { registerAs } from '@nestjs/config';

export default registerAs('llm', () => ({
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiModel: process.env.GEMINI_MODEL,
}));
