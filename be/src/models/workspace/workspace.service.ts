import { Injectable } from '@nestjs/common';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceEntity } from './entities/workspace.entity';
import { plainToInstance } from 'class-transformer';
import { WorkspaceMemberEntity } from '../workspace-member/entities/workspace-member.entity';
import { ProjectEntity } from '../project/entities/project.entity';
import { CreditCodeEntity } from '../credit-code/entities/credit-code.entity';

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceRepository: Repository<WorkspaceEntity>,
    @InjectRepository(WorkspaceMemberEntity)
    private readonly workspaceMemberRepository: Repository<WorkspaceMemberEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(CreditCodeEntity)
    private readonly creditCodeRepository: Repository<CreditCodeEntity>,
  ) {}

  async create(
    queryRunner: any,
    createWorkspaceDto: CreateWorkspaceDto,
  ): Promise<WorkspaceEntity> {
    const planExpiryDate = new Date();
    planExpiryDate.setMonth(
      planExpiryDate.getMonth() + createWorkspaceDto.duration,
    );

    const workspace = queryRunner.manager.create(WorkspaceEntity, {
      ...createWorkspaceDto,
      planExpiryDate,
    });
    await queryRunner.manager.save(workspace);
    return workspace;
  }

  async getAllWorkspaceOfUser(userId: string): Promise<WorkspaceEntity[]> {
    return this.workspaceMemberRepository
      .find({
        select: ['workspace'],
        where: { userId },
        relations: ['workspace'],
      })
      .then((workspaceMembers) =>
        workspaceMembers.map((workspaceMember) => workspaceMember.workspace),
      );
  }

  async getOne(workspaceId: string) {
    return this.workspaceRepository.findOneByOrFail({ workspaceId });
  }

  async update(workspaceId: string, updateWorkspaceDto: UpdateWorkspaceDto) {
    const workspace = await this.getOne(workspaceId);
    Object.assign(workspace, updateWorkspaceDto);
    return this.workspaceRepository.save(workspace);
  }

  async remove(workspaceId: string) {
    const workspace = await this.getOne(workspaceId);
    return this.workspaceRepository.remove(workspace);
  }

  async getAllMember(workspaceId: string): Promise<object[]> {
    return this.workspaceMemberRepository
      .find({
        select: ['user', 'role'],
        where: { workspaceId },
        relations: ['user'],
      })
      .then((workspaceMembers) =>
        workspaceMembers.map((workspaceMember) => ({
          ...workspaceMember.user,
          role: workspaceMember.role,
        })),
      );
  }

  async countMembers(workspaceId: string): Promise<number> {
    return this.workspaceMemberRepository.countBy({ workspaceId });
  }

  async getAllProject(workspaceId: string): Promise<ProjectEntity[]> {
    return this.projectRepository.findBy({ workspaceId });
  }

  async countCreatedProjects(workspaceId: string): Promise<number> {
    return this.projectRepository.countBy({ workspaceId });
  }

  async countCreatedBots(workspaceId: string): Promise<number> {
    return this.projectRepository
      .createQueryBuilder('project')
      .leftJoin('project.botSocials', 'botSocial')
      .where('project.workspaceId = :workspaceId', { workspaceId })
      .select('COUNT(botSocial.botSocialId)', 'count')
      .getRawOne()
      .then((result) => parseInt(result.count, 10) || 0);
  }

  async getAllCreditCode(workspaceId: string): Promise<CreditCodeEntity[]> {
    return this.creditCodeRepository.findBy({ workspaceId });
  }

  async countUsedCredits(workspaceId: string): Promise<number | null> {
    return this.creditCodeRepository.sum('usedCredits', { workspaceId });
  }
}
