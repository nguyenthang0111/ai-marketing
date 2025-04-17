import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { MemberBotUsageEntity } from './entities/member-bot-usage.entity';
import { CreateMemberBotUsageDto } from './dto/create-member-bot-usage.dto';
@Injectable()
export class MemberBotUsageService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(MemberBotUsageEntity)
    private readonly memberBotUsageRepository: Repository<MemberBotUsageEntity>,
  ) {}

  async create(
    queryRunner: any,
    createMemberBotUsageDto: CreateMemberBotUsageDto,
  ): Promise<MemberBotUsageEntity> {
    const memberBotUsage = queryRunner.manager.create(
      MemberBotUsageEntity,
      createMemberBotUsageDto,
    );
    return queryRunner.manager.save(memberBotUsage);
  }

  async update(
    userId: string,
    botSocialId?: string,
    botWebId?: string,
    chatbotId?: string,
  ) {
    const memberBotUsage = await this.memberBotUsageRepository.findOneByOrFail({
      userId,
      botSocialId,
      botWebId,
      chatbotId,
    });
    memberBotUsage.lastUsedAt = new Date();
    return this.memberBotUsageRepository.save(memberBotUsage);
  }
}
