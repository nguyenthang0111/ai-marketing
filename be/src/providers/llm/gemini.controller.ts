import { Body, Controller, Post } from '@nestjs/common';
import { GenerateContentDto } from './dto/generate-content.dto';
import { GeminiService } from './gemini.service';
import { SuggestTitleDto } from './dto/suggest-title.dto';
import { MemberBotUsageService } from 'src/models/member-bot-usage/member-bot-usage.service';
import { User } from 'src/common/decorators/user.decorator';
@Controller('llm')
export class GeminiController {
  constructor(
    private readonly geminiService: GeminiService,
    private readonly memberBotUsageService: MemberBotUsageService,
  ) {}

  @Post('generate-content')
  async generateContent(
    @User('userId') userId: string,
    @Body() generateContentDto: GenerateContentDto,
  ) {
    const content =
      await this.geminiService.generateContent(generateContentDto);

    await this.memberBotUsageService.update(
      userId,
      generateContentDto.botSocialId,
      generateContentDto.botWebId,
    );

    return content;
  }

  @Post('suggest-title')
  async suggestTitle(
    @User('userId') userId: string,
    @Body() suggestTitleDto: SuggestTitleDto,
  ) {
    const titles = await this.geminiService.suggestTitle(
      suggestTitleDto.articleContent,
    );

    await this.memberBotUsageService.update(
      userId,
      suggestTitleDto.botSocialId,
      suggestTitleDto.botWebId,
    );

    return titles;
  }

  @Post('optimize-prompt')
  async optimizePrompt(@Body() optimizePromptDto: GenerateContentDto) {
    return this.geminiService.optimizePrompt(optimizePromptDto.userPrompt);
  }
}
