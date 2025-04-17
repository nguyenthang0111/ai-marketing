import { Injectable } from '@nestjs/common';
import { AddWorkspaceMemberDto } from './dto/add-workspace-member.dto';
import { UpdateWorkspaceMemberDto } from './dto/update-workspace-member.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { WorkspaceMemberEntity } from './entities/workspace-member.entity';

@Injectable()
export class WorkspaceMemberService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(WorkspaceMemberEntity)
    private readonly workspaceMemberRepository: Repository<WorkspaceMemberEntity>,
  ) {}
  async addWorkspaceMember(
    queryRunner: any,
    addWorkspaceMemberDto: AddWorkspaceMemberDto,
  ) {
    const workspaceMember = queryRunner.manager.create(WorkspaceMemberEntity, {
      ...addWorkspaceMemberDto,
      workspaceId: addWorkspaceMemberDto.workspace.workspaceId,
      userId: addWorkspaceMemberDto.user.userId,
      role: addWorkspaceMemberDto.role,
    });
    return queryRunner.manager.save(workspaceMember);
  }

  async getAllWorkspace(userId: string) {
    const workspaceMembers = await this.workspaceMemberRepository.find({
      where: { userId },
      relations: ['workspace', 'workspace.creditCodes'],
    });
    return workspaceMembers.map((member) => ({
      ...member.workspace,
      creditCodes: member.workspace.creditCodes,
    }));
  }

  async getAllMembers(workspaceId: string) {
    const workspaceMembers = await this.workspaceMemberRepository.find({
      where: { workspaceId },
      relations: ['user'],
    });
    return workspaceMembers.map((member) => member.user);
  }
}
