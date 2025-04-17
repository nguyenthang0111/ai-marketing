import { PartialType } from '@nestjs/mapped-types';
import { CreateBotWebDto } from './create-bot-web.dto';

export class UpdateBotWebDto extends PartialType(CreateBotWebDto) {}
