import { Module } from '@nestjs/common';
import { CreditCodeService } from './credit-code.service';
import { CreditCodeController } from './credit-code.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditCodeEntity } from './entities/credit-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreditCodeEntity])],
  controllers: [CreditCodeController],
  providers: [CreditCodeService],
  exports: [TypeOrmModule, CreditCodeService],
})
export class CreditCodeModule {}
