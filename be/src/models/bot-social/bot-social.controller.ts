import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { BotSocialService } from './bot-social.service';
import { CreateBotSocialDto } from './dto/create-bot-social.dto';
import { UpdateBotSocialDto } from './dto/update-bot-social.dto';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';
import { BotSocialEntity } from './entities/bot-social.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('bot-social')
export class BotSocialController {
  constructor(
    private readonly botSocialService: BotSocialService,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}

  @Get(':botSocialId') // GET /bot-social/:botSocialId
  getOne(@Param('botSocialId') botSocialId: string): Promise<BotSocialEntity> {
    return this.botSocialService.getOne(botSocialId);
  }

  @Patch(':botSocialId') // PATCH /bot-social/:botSocialId
  async update(
    @Param('botSocialId') botSocialId: string,
    @Body() updateBotSocialDto: UpdateBotSocialDto,
  ) {
    const botSocial = await this.botSocialService.update(
      botSocialId,
      updateBotSocialDto,
    );
    return {
      message: 'Bot Social updated successfully',
      data: botSocial,
    };
  }

  @Delete(':botSocialId') // DELETE /bot-social/:botSocialId
  async remove(@Param('botSocialId') botSocialId: string) {
    await this.botSocialService.remove(botSocialId);
    return {
      message: 'Bot Social deleted successfully',
    };
  }
}
