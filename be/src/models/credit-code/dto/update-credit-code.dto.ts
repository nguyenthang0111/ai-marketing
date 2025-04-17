import { PartialType } from '@nestjs/mapped-types';
import { CreateCreditCodeDto } from './create-credit-code.dto';

export class UpdateCreditCodeDto extends PartialType(CreateCreditCodeDto) {}
