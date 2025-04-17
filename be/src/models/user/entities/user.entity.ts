import { UserInterface } from './../interfaces/user.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  Relation,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { BotSocialEntity } from 'src/models/bot-social/entities/bot-social.entity';
import { Exclude } from 'class-transformer';
import { BotWebEntity } from 'src/models/bot-web/entities/bot-web.entity';
import { WorkspaceMemberEntity } from 'src/models/workspace-member/entities/workspace-member.entity';
import { WorkspaceLogEntity } from 'src/models/workspace-log/entities/workspace-log.entity';
import { ProductEntity } from 'src/models/product/entities/product.entity';
import { ProjectEntity } from 'src/models/project/entities/project.entity';
import { ChatbotEntity } from 'src/models/chatbot/entities/chatbot.entity';
import { DocumentEntity } from 'src/models/document/entities/document.entity';
import { BrandEntity } from 'src/models/brand/entities/brand.entity';
import * as bcrypt from 'bcrypt';
import { MemberBotUsageEntity } from 'src/models/member-bot-usage/entities/member-bot-usage.entity';

export enum EmailProvider {
  Email = 'Email',
  Google = 'Google',
  Facebook = 'Facebook',
}
export enum AccountStatus {
  NotVerify = 'NOT VERIFY',
  Active = 'ACTIVE',
  Disabled = 'DISABLED',
}

const cascadeOptions: ('insert' | 'update' | 'soft-remove' | 'recover')[] = [
  // 'insert',
  'update',
  'soft-remove',
  'recover',
];

@Entity({ name: 'user' })
export class UserEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { length: 100, nullable: true })
  password: string | null;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  @Column('varchar', { length: 100, unique: true })
  name: string;

  @Column('mediumtext', { name: 'avatar_url', nullable: true })
  avatarUrl: string | null;

  @Column('varchar', { name: 'google_id', nullable: true })
  googleId: string | null;

  @Column('enum', { enum: EmailProvider, name: 'email_provider' })
  emailProvider: EmailProvider;

  @Column('enum', {
    enum: AccountStatus,
    name: 'account_status',
    default: AccountStatus.NotVerify,
  })
  accountStatus: AccountStatus;

  @Column('varchar', { nullable: true })
  verificationToken: string | null;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt?: Date;

  @OneToMany(() => BotSocialEntity, (botSocial) => botSocial.user, {
    cascade: cascadeOptions,
  })
  botSocials: Relation<BotSocialEntity[]>;

  @OneToMany(() => BotWebEntity, (botWeb) => botWeb.user, {
    cascade: cascadeOptions,
  })
  botWebs: Relation<BotWebEntity[]>;

  @OneToMany(() => ProductEntity, (product) => product.user, {
    cascade: cascadeOptions,
  })
  products: Relation<ProductEntity[]>;

  @OneToMany(() => ProjectEntity, (project) => project.user, {
    cascade: cascadeOptions,
  })
  projects: Relation<ProjectEntity[]>;

  @OneToMany(() => ChatbotEntity, (chatbot) => chatbot.user, {
    cascade: cascadeOptions,
  })
  chatbots: Relation<ChatbotEntity[]>;

  @OneToMany(() => DocumentEntity, (document) => document.user, {
    cascade: cascadeOptions,
  })
  documents: Relation<DocumentEntity[]>;

  @OneToMany(() => BrandEntity, (brand) => brand.user, {
    cascade: cascadeOptions,
  })
  brands: Relation<BrandEntity[]>;

  @OneToMany(
    () => WorkspaceMemberEntity,
    (workspaceMember) => workspaceMember.user,
    {
      cascade: cascadeOptions,
    },
  )
  workspaceMembers: Relation<WorkspaceMemberEntity[]>;

  @OneToMany(() => WorkspaceLogEntity, (workspaceLog) => workspaceLog.user, {
    cascade: cascadeOptions,
  })
  workspaceLogs: Relation<WorkspaceLogEntity[]>;

  @OneToMany(
    () => MemberBotUsageEntity,
    (memberBotUsage) => memberBotUsage.user,
    {
      cascade: cascadeOptions,
    },
  )
  memberBotUsages: Relation<MemberBotUsageEntity[]>;

  constructor(user: Partial<UserEntity>) {
    Object.assign(this, user);
  }
}
