import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  SerializeOptions,
  ClassSerializerInterceptor,
  UseGuards,
  Req,
  ConflictException,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { UpdateWorkspaceDto } from './dto/update-workspace.dto';
import { UserService } from '../user/user.service';
import { WorkspaceMemberService } from '../workspace-member/workspace-member.service';
import { CreditCodeService } from '../credit-code/credit-code.service';
import { ProjectEntity } from '../project/entities/project.entity';
import { DataSource } from 'typeorm';
import { CreditCodeEntity } from '../credit-code/entities/credit-code.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { User } from 'src/common/decorators/user.decorator';
import { ProjectService } from '../project/project.service';

@UseGuards(AuthGuard('jwt'))
@Controller('workspace')
export class WorkspaceController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService,
    private readonly workspaceMemberService: WorkspaceMemberService,
    private readonly creditCodeService: CreditCodeService,
    private readonly projectService: ProjectService,
  ) {}

  @Get() // GET /workspace
  getAllWorkspaceOfUser(@User('userId') userId: string) {
    return this.workspaceService.getAllWorkspaceOfUser(userId);
  }

  @Get(':workspaceId') // GET /workspace/:workspaceId
  getOne(@Param('workspaceId') workspaceId: string) {
    return this.workspaceService.getOne(workspaceId);
  }

  @Patch(':workspaceId') // PATCH /workspace/:workspaceId
  async update(
    @Param('workspaceId') workspaceId: string,
    @Body() updateWorkspaceDto: UpdateWorkspaceDto,
  ) {
    await this.workspaceService.update(workspaceId, updateWorkspaceDto);
    return { message: 'Workspace updated successfully' };
  }

  @Delete(':workspaceId') // DELETE /workspace/:workspaceId
  async remove(@Param('workspaceId') workspaceId: string): Promise<object> {
    await this.workspaceService.remove(workspaceId);
    return { message: 'Workspace deleted successfully' };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':workspaceId/project') // POST /workspace/:workspaceId/project
  async createProject(
    @User('userId') userId: string,
    @Param('workspaceId') workspaceId: string,
    @Body() createProjectDto: CreateProductDto,
  ) {
    const [workspace, user, createdProjects] = await Promise.all([
      this.workspaceService.getOne(workspaceId),
      this.userService.getOneById(userId),
      this.workspaceService.countCreatedProjects(workspaceId),
    ]);

    if (createdProjects == workspace.totalProjects) {
      throw new ConflictException('You have reached the maximum project limit');
    }

    const project = await this.projectService.create(
      createProjectDto,
      workspace,
      user,
    );
    return {
      message: 'Project created successfully',
      data: project,
    };
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':workspaceId/project') // GET /workspace/:workspaceId/project
  getAllProject(
    @Param('workspaceId') workspaceId: string,
  ): Promise<ProjectEntity[]> {
    return this.workspaceService.getAllProject(workspaceId);
  }

  @Get(':workspaceId/member') // GET /workspace/:workspaceId/member
  getAllMember(@Param('workspaceId') workspaceId: string): Promise<object[]> {
    return this.workspaceService.getAllMember(workspaceId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':workspaceId/credit-code') // GET /workspace/:workspaceId/credit-code
  getAllCreditCode(
    @Param('workspaceId') workspaceId: string,
  ): Promise<CreditCodeEntity[]> {
    return this.workspaceService.getAllCreditCode(workspaceId);
  }
}
