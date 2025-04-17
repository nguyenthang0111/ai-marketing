import { GenerativeModel } from '@google/generative-ai';
import { Inject, Injectable } from '@nestjs/common';
import { GEMINI_FLASH_MODEL } from 'src/common/constants/gemini.constant';
import { ContentFormat, GenerateContentDto } from './dto/generate-content.dto';

interface ContentFormatField {
  key: keyof ContentFormat;
  label: (value?: string | boolean) => string;
}

const CONTENT_FORMAT_FIELDS: ContentFormatField[] = [
  {
    key: 'customContent',
    label: (value) =>
      value
        ? `Add custom content to enhance creativity and distinction: ${value}`
        : '',
  },
  {
    key: 'creativityLevel',
    label: (value) => `Creativity Level: ${value}`,
  },
  {
    key: 'tone',
    label: (value) => `Tone: ${value}`,
  },
  {
    key: 'length',
    label: (value) => `Length: ${value}`,
  },
  {
    key: 'language',
    label: (value) => `Language: ${value}`,
  },
  {
    key: 'useEmoji',
    label: (value) =>
      value
        ? 'Use emojis to make the content visually appealing'
        : 'Do not use emojis',
  },
  {
    key: 'useMarkdown',
    label: (value) =>
      value
        ? 'Use markdown for headings, lists, and emphasis to improve readability'
        : 'Do not use markdown',
  },
] as const;

@Injectable()
export class GeminiService {
  constructor(
    @Inject(GEMINI_FLASH_MODEL)
    private readonly flashModel: GenerativeModel,
  ) {}

  async generateContent(
    generateContentDto: GenerateContentDto,
  ): Promise<string> {
    const { userPrompt, contentFormat } = generateContentDto;

    const requirements = [
      'Important article requirements:',
      'Avoid explicitly labeling the AIDA sections. Make the flow natural and engaging.',
      ...(contentFormat
        ? CONTENT_FORMAT_FIELDS.filter(
            (field) => field.key in contentFormat,
          ).map((field) => `- ${field.label(contentFormat[field.key])}`)
        : []),
    ].join('\n');
    const prompt = `${userPrompt}\n${requirements}`;

    const res = await this.flashModel.generateContent(prompt);
    return res.response.text();
  }

  async suggestTitle(articleContent: string): Promise<string> {
    const prompt = `
      I need you to generate 10 creative and relevant titles for the following article. The titles should capture the essence of the content and be written in the same language as the article. The goal is to create engaging, clear, and appealing titles that are suitable for various purposes, such as blogs, social media, or SEO optimization.

      Article Content: ${articleContent}

      Key instructions for the titles:
      1.  Titles should reflect the main ideas of the article.
      2.  Use a style and tone that fits the article's intended audience.
      3.  Each title should be unique and avoid repetition.

      Return the 10 titles in the following format as a JSON array for easy conversion to a JavaScript array:
      ["Title 1", "Title 2", "Title 3", "Title 4", "Title 5", "Title 6", "Title 7", "Title 8", "Title 9", "Title 10"]`;

    const res = await this.flashModel.generateContent(prompt);
    return res.response.text();
  }

  async optimizePrompt(userPrompt: string): Promise<string> {
    const prompt = `
      I need your help to optimize the following user-written prompt for better results when interacting with an AI language model.
      The goal is to make the prompt more specific, clear, and likely to yield accurate and high-quality outputs.
      
      Ensure the optimized prompt:
        1.  Keeps all placeholder variables such as {{BrandName}} and others intact and unchanged.
        2.  Is clear, unambiguous, and as specific as possible without being overly restrictive.
        3.  Adapts the tone and style to match the intended audience or purpose.
        4.  Avoids adding any explanations, comments, or conclusions—return only the optimized version of the prompt.

      User-written prompt:${userPrompt}
      Please provide the optimized prompt in your response without any additional commentary.
      Thank you!`;

    const res = await this.flashModel.generateContent(prompt);
    return res.response.text();
  }
}
