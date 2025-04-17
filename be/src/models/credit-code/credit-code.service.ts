import { Injectable } from '@nestjs/common';
import { CreateCreditCodeDto } from './dto/create-credit-code.dto';
import { UpdateCreditCodeDto } from './dto/update-credit-code.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreditCodeEntity } from './entities/credit-code.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CreditCodeService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(CreditCodeEntity)
    private readonly creditCodeRepository: Repository<CreditCodeEntity>,
  ) {}

  async create(
    queryRunner: any,
    createCreditCodeDto: CreateCreditCodeDto,
  ): Promise<CreditCodeEntity> {
    const effectiveDate = new Date();
    const expirationDate = effectiveDate;
    expirationDate.setMonth(
      expirationDate.getMonth() + createCreditCodeDto.duration,
    );

    const creditCode = queryRunner.manager.create(CreditCodeEntity, {
      totalCredits: createCreditCodeDto.totalCredits,
      effectiveDate,
      expirationDate,
      workspace: createCreditCodeDto.workspace,
    });
    await queryRunner.manager.save(creditCode);
    return creditCode;
  }
}
