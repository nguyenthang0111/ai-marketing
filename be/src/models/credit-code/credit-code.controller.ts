import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreditCodeService } from './credit-code.service';
import { CreateCreditCodeDto } from './dto/create-credit-code.dto';
import { UpdateCreditCodeDto } from './dto/update-credit-code.dto';

@Controller('credit-code')
export class CreditCodeController {
  constructor(private readonly creditCodeService: CreditCodeService) {}
}
