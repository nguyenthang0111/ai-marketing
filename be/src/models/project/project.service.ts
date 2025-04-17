import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entities/project.entity';
import { DataSource, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { WorkspaceEntity } from '../workspace/entities/workspace.entity';
import { UserEntity } from '../user/entities/user.entity';
import { ProductEntity } from '../product/entities/product.entity';
import { BrandEntity } from '../brand/entities/brand.entity';
import { BotSocialEntity } from '../bot-social/entities/bot-social.entity';
@Injectable()
export class ProjectService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(BrandEntity)
    private readonly brandRepository: Repository<BrandEntity>,
    @InjectRepository(BotSocialEntity)
    private readonly botSocialRepository: Repository<BotSocialEntity>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    workspace: WorkspaceEntity,
    user: UserEntity,
  ): Promise<ProjectEntity> {
    await this.checkExistingProjectName(
      createProjectDto.name,
      workspace.workspaceId,
    );

    const project = plainToInstance(ProjectEntity, createProjectDto);
    project.workspace = workspace;
    project.user = user;
    return this.projectRepository.save(project);
  }

  getOne(projectId: string): Promise<ProjectEntity> {
    return this.projectRepository.findOneByOrFail({ projectId });
  }

  getOneWithRelations(projectId: string): Promise<ProjectEntity> {
    return this.projectRepository.findOneOrFail({
      where: { projectId },
      relations: ['products', 'brands', 'botSocials'],
    });
  }

  async update(
    projectId: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectEntity> {
    const project = await this.getOne(projectId);
    const newProjectName = updateProjectDto.name;
    if (newProjectName && project.name != newProjectName)
      await this.checkExistingProjectName(newProjectName, project.workspaceId);

    Object.assign(project, updateProjectDto);
    return this.projectRepository.save(project);
  }

  async remove(projectId: string) {
    const project = await this.getOne(projectId);
    this.projectRepository.remove(project);
  }

  async checkExistingProjectName(name: string, workspaceId: string) {
    const existingProjectName = await this.projectRepository.exists({
      where: { name, workspaceId },
    });
    if (existingProjectName) {
      throw new ConflictException(
        'Project name already exists in this workspace',
      );
    }
  }

  async getAllProduct(projectId: string): Promise<ProductEntity[]> {
    return this.productRepository.findBy({ projectId });
  }

  async getAllBrand(projectId: string): Promise<BrandEntity[]> {
    return this.brandRepository.findBy({ projectId });
  }

  async getAllBotSocial(projectId: string): Promise<BotSocialEntity[]> {
    return this.botSocialRepository.findBy({ projectId });
  }
}
