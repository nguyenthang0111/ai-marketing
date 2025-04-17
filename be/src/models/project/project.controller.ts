import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ConflictException,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectEntity } from './entities/project.entity';
import { UserService } from '../user/user.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { ProductEntity } from '../product/entities/product.entity';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BotSocialEntity } from '../bot-social/entities/bot-social.entity';
import { BrandService } from '../brand/brand.service';
import { CreateBrandDto } from '../brand/dto/create-brand.dto';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { User } from 'src/common/decorators/user.decorator';
import { ProductService } from '../product/product.service';
import { CreateBotSocialDto } from '../bot-social/dto/create-bot-social.dto';
import { BotSocialService } from '../bot-social/bot-social.service';
import { MemberBotUsageService } from '../member-bot-usage/member-bot-usage.service';
import { WorkspaceMemberService } from '../workspace-member/workspace-member.service';
import { UserEntity } from '../user/entities/user.entity';
import { DataSource } from 'typeorm';
@Controller('project')
export class ProjectController {
  constructor(
    private readonly dataSource: DataSource,
    private readonly projectService: ProjectService,
    private readonly workspaceService: WorkspaceService,
    private readonly userService: UserService,
    private readonly brandService: BrandService,
    private readonly productService: ProductService,
    private readonly botSocialService: BotSocialService,
    private readonly memberBotUsageService: MemberBotUsageService,
    private readonly workspaceMemberService: WorkspaceMemberService,
  ) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':projectId') // GET /project/:projectId
  getOne(@Param('projectId') projectId: string): Promise<ProjectEntity> {
    return this.projectService.getOneWithRelations(projectId);
  }

  @Patch(':projectId') // PATCH /project/:projectId
  async update(
    @Param('projectId') projectId: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<object> {
    const project = await this.projectService.update(
      projectId,
      updateProjectDto,
    );
    return { message: 'Project updated successfully', data: project };
  }

  @Delete(':projectId') // DELETE /project/:projectId
  async remove(@Param('projectId') projectId: string): Promise<object> {
    await this.projectService.remove(projectId);
    return { message: 'Project deleted successfully' };
  }

  @Get(':projectId/product') // GET /project/:projectId/product
  async getAllProduct(
    @Param('projectId') projectId: string,
  ): Promise<ProductEntity[]> {
    return this.projectService.getAllProduct(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':projectId/product') // POST /project/:projectId/product
  async createProduct(
    @User('userId') userId: string,
    @Param('projectId') projectId: string,
    @Body() createProductDto: CreateProductDto,
  ): Promise<object> {
    const [project, user] = await Promise.all([
      this.projectService.getOne(projectId),
      this.userService.getOneById(userId),
    ]);

    const product = await this.productService.create(
      createProductDto,
      project,
      user,
    );
    return {
      message: 'Product created successfully',
      data: product,
    };
  }

  @Get(':projectId/brand') // GET /project/:projectId/brand
  async getAllBrand(
    @Param('projectId') projectId: string,
  ): Promise<BrandEntity[]> {
    return this.projectService.getAllBrand(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':projectId/brand') // POST /project/:projectId/brand
  async createBrand(
    @User('userId') userId: string,
    @Param('projectId') projectId: string,
    @Body() createBrandDto: CreateBrandDto,
  ): Promise<object> {
    const [project, user] = await Promise.all([
      this.projectService.getOne(projectId),
      this.userService.getOneById(userId),
    ]);

    const brand = await this.brandService.create(createBrandDto, project, user);
    return {
      message: 'Brand created successfully',
      data: brand,
    };
  }

  @Get(':projectId/bot-social') // GET /project/:projectId/bot-social
  async getAllBotSocial(
    @Param('projectId') projectId: string,
  ): Promise<BotSocialEntity[]> {
    return this.projectService.getAllBotSocial(projectId);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post(':projectId/bot-social') // POST /project/:projectId/bot-social
  async createBotSocial(
    @User('userId') userId: string,
    @Param('projectId') projectId: string,
    @Body() createBotSocialDto: CreateBotSocialDto,
  ): Promise<object> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const [project, user] = await Promise.all([
        this.projectService.getOne(projectId),
        this.userService.getOneById(userId),
      ]);

      const [workspace, createdBots] = await Promise.all([
        this.workspaceService.getOne(project.workspaceId),
        this.workspaceService.countCreatedBots(project.workspaceId),
      ]);
      if (createdBots == workspace.totalBots) {
        throw new ConflictException('You have reached the maximum bot limit');
      }

      const botSocial = await this.botSocialService.create(
        queryRunner,
        createBotSocialDto,
        project,
        user,
      );

      const workspaceMembers: UserEntity[] =
        await this.workspaceMemberService.getAllMembers(project.workspaceId);
      await Promise.all(
        workspaceMembers.map((member) =>
          this.memberBotUsageService.create(queryRunner, {
            user: member,
            workspace: workspace,
            botSocial: botSocial,
          }),
        ),
      );

      await queryRunner.commitTransaction();

      return {
        message: 'BotSocial created successfully',
        data: botSocial,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
