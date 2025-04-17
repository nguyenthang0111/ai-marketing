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
import { BotWebInterface } from '../interfaces/bot-web.interface';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { ProjectEntity } from 'src/models/project/entities/project.entity';
import { MemberBotUsageEntity } from 'src/models/member-bot-usage/entities/member-bot-usage.entity';

const cascadeOptions: ('insert' | 'update' | 'remove')[] = [
  // 'insert',
  'update',
  'remove',
];

@Entity({ name: 'bot_web' })
export class BotWebEntity implements BotWebInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'bot_web_id' })
  botWebId: string;

  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('mediumtext', { nullable: true })
  description?: string | null;

  @Column('mediumtext', { nullable: true })
  prompt: string;

  @Column('bool', { default: false })
  favorite: boolean;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.botWebs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Relation<ProjectEntity>;

  @ManyToOne(() => UserEntity, (user) => user.botWebs)
  @JoinColumn({ name: 'created_by' })
  user: Relation<UserEntity>;

  @OneToMany(
    () => MemberBotUsageEntity,
    (memberBotUsage) => memberBotUsage.botWeb,
    {
      cascade: cascadeOptions,
    },
  )
  memberBotUsages: Relation<MemberBotUsageEntity[]>;

  constructor(partial: Partial<BotWebEntity>) {
    Object.assign(this, partial);
  }
}
