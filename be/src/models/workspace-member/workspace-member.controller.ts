import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceMemberService } from './workspace-member.service';
import { DataSource } from 'typeorm';
import { AddWorkspaceMemberDto } from './dto/add-workspace-member.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('workspace-member')
export class WorkspaceMemberController {
  constructor(
    private readonly workspaceMemberService: WorkspaceMemberService,
    private readonly dataSource: DataSource
  ) {}

  @Post()
  async addWorkspaceMember(@Body() addWorkspaceMemberDto: AddWorkspaceMemberDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const workspaceMember = await this.workspaceMemberService.addWorkspaceMember(
        queryRunner,
        addWorkspaceMemberDto,
      );
      await queryRunner.commitTransaction();
      return workspaceMember;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('workspaces-by-user')
  getWorkspaceByUSer(@Req() req: any) {
    const userId = req.user.userId;
    return this.workspaceMemberService.getAllWorkspace(userId);
  }

  @Get('user-in-workspace')
  getAllUserInWorkspace(@Req() req: any) {
    const workspaceId = req.user.workspaceId;
    return this.workspaceMemberService.getAllMembers(workspaceId);
  }
}
