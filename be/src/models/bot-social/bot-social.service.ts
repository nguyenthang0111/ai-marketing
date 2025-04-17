import { Injectable } from '@nestjs/common';
import { CreateBotSocialDto } from './dto/create-bot-social.dto';
import { UpdateBotSocialDto } from './dto/update-bot-social.dto';
import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BotSocialEntity } from './entities/bot-social.entity';
import { ConflictException } from '@nestjs/common';
import { ProjectEntity } from '../project/entities/project.entity';
import { UserEntity } from '../user/entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BotSocialService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(BotSocialEntity)
    private readonly botSocialRepository: Repository<BotSocialEntity>,
  ) {}

  async create(
    queryRunner: any,
    createBotSocialDto: CreateBotSocialDto,
    project: ProjectEntity,
    user: UserEntity,
  ): Promise<BotSocialEntity> {
    await this.checkExistingBotSocialName(
      createBotSocialDto.name,
      project.projectId,
    );

    const botSocial = queryRunner.manager.create(
      BotSocialEntity,
      createBotSocialDto,
    );
    botSocial.project = project;
    botSocial.user = user;

    return queryRunner.manager.save(botSocial);
  }

  getOne(botSocialId: string): Promise<BotSocialEntity> {
    return this.botSocialRepository.findOneByOrFail({ botSocialId });
  }

  async update(botSocialId: string, updateBotSocialDto: UpdateBotSocialDto) {
    const botSocial = await this.getOne(botSocialId);
    const newBotSocialName = updateBotSocialDto.name;
    if (newBotSocialName && botSocial.name != newBotSocialName)
      await this.checkExistingBotSocialName(
        newBotSocialName,
        botSocial.projectId,
      );

    Object.assign(botSocial, updateBotSocialDto);
    return this.botSocialRepository.save(botSocial);
  }

  async remove(botSocialId: string) {
    const botSocial = await this.getOne(botSocialId);
    return this.botSocialRepository.remove(botSocial);
  }

  async checkExistingBotSocialName(name: string, projectId: string) {
    const existingBotSocial = await this.botSocialRepository.exists({
      where: { name, projectId },
    });
    if (existingBotSocial)
      throw new ConflictException(
        'Bot Social name already exists in this project',
      );
  }
}
