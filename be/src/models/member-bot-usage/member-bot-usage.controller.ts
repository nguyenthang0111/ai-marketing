import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MemberBotUsageService } from './member-bot-usage.service';

@Controller('member-bot-usage')
export class MemberBotUsageController {
  constructor(private readonly memberBotUsageService: MemberBotUsageService) {}
}
