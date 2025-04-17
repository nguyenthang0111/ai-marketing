import { BotSocialInterface } from './../interfaces/bot-social.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Relation,
  JoinColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { ProjectEntity } from 'src/models/project/entities/project.entity';
import { MemberBotUsageEntity } from 'src/models/member-bot-usage/entities/member-bot-usage.entity';

const cascadeOptions: ('insert' | 'update' | 'remove')[] = [
  // 'insert',
  'update',
  'remove',
];
@Entity({ name: 'bot_social' })
export class BotSocialEntity implements BotSocialInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'bot_social_id' })
  botSocialId: string;

  @Exclude()
  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('mediumtext', { nullable: true })
  description?: string | null;

  @Column('mediumtext', { nullable: true })
  prompt?: string | null;

  @Column('boolean', { default: false })
  favorite: boolean;

  @Exclude()
  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.botSocials)
  @JoinColumn({ name: 'created_by' })
  user: Relation<UserEntity>;

  @Exclude()
  @ManyToOne(() => ProjectEntity, (project) => project.botSocials, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Relation<ProjectEntity>;

  @OneToMany(
    () => MemberBotUsageEntity,
    (memberBotUsage) => memberBotUsage.botSocial,
    { cascade: cascadeOptions },
  )
  memberBotUsages: Relation<MemberBotUsageEntity[]>;

  constructor(botSocial: Partial<BotSocialEntity>) {
    Object.assign(this, botSocial);
  }
}
