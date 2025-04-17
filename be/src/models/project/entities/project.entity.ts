import { ProjectInterface } from './../interfaces/project.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  Relation,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';
import { BotWebEntity } from 'src/models/bot-web/entities/bot-web.entity';
import { BotSocialEntity } from 'src/models/bot-social/entities/bot-social.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { ChatbotEntity } from 'src/models/chatbot/entities/chatbot.entity';
import { BrandEntity } from 'src/models/brand/entities/brand.entity';
import { DocumentEntity } from 'src/models/document/entities/document.entity';
import { ProductEntity } from 'src/models/product/entities/product.entity';

const cascadeOptions: ('insert' | 'update')[] = ['insert', 'update'];
@Entity({ name: 'project' })
export class ProjectEntity implements ProjectInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'project_id' })
  projectId: string;

  @Column('uuid', { name: 'workspace_id' })
  workspaceId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('mediumtext', { nullable: true })
  description?: string | null;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @Exclude()
  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.projects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Relation<WorkspaceEntity>;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn({ name: 'created_by' })
  user: Relation<UserEntity>;

  @OneToMany(() => BotWebEntity, (botWeb) => botWeb.project, {
    cascade: cascadeOptions,
  })
  botWebs: BotWebEntity[];

  @OneToMany(() => BotSocialEntity, (botSocial) => botSocial.project, {
    cascade: cascadeOptions,
  })
  botSocials: BotSocialEntity[];

  @OneToMany(() => ChatbotEntity, (chatbot) => chatbot.project, {
    cascade: cascadeOptions,
  })
  chatbots: ChatbotEntity[];

  @OneToMany(() => BrandEntity, (brand) => brand.project, {
    cascade: cascadeOptions,
  })
  brands: BrandEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.project, {
    cascade: cascadeOptions,
  })
  documents: DocumentEntity[];

  @OneToMany(() => ProductEntity, (product) => product.project, {
    cascade: cascadeOptions,
  })
  products: ProductEntity[];

  constructor(project: Partial<ProjectEntity>) {
    Object.assign(this, project);
  }
}
