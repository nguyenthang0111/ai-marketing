import { PartialType } from '@nestjs/mapped-types';
import { CreateBotSocialDto } from './create-bot-social.dto';

export class UpdateBotSocialDto extends PartialType(CreateBotSocialDto) {}
