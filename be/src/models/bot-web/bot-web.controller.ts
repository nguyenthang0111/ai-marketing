import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BotWebService } from './bot-web.service';
import { CreateBotWebDto } from './dto/create-bot-web.dto';
import { UpdateBotWebDto } from './dto/update-bot-web.dto';

@Controller('bot-web')
export class BotWebController {
  constructor(private readonly botWebService: BotWebService) {}
}
