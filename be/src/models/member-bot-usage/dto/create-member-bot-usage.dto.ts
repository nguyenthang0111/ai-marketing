import { IsDefined, IsOptional } from 'class-validator';
import { BotSocialEntity } from 'src/models/bot-social/entities/bot-social.entity';
import { BotWebEntity } from 'src/models/bot-web/entities/bot-web.entity';
import { ChatbotEntity } from 'src/models/chatbot/entities/chatbot.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';

export class CreateMemberBotUsageDto {
  @IsDefined()
  user: UserEntity;

  @IsDefined()
  workspace: WorkspaceEntity;

  @IsOptional()
  botSocial?: BotSocialEntity;

  @IsOptional()
  botWeb?: BotWebEntity;

  @IsOptional()
  chatbot?: ChatbotEntity;
}
