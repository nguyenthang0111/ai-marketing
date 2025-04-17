import { ChatbotInterface } from './../interfaces/chatbot.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ProjectEntity } from 'src/models/project/entities/project.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { MemberBotUsageEntity } from 'src/models/member-bot-usage/entities/member-bot-usage.entity';

const cascadeOptions: ('insert' | 'update' | 'remove')[] = [
  // 'insert',
  'update',
  'remove',
];

@Entity({ name: 'chatbot' })
export class ChatbotEntity implements ChatbotInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'chatbot_id' })
  chatbotId: string;

  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('mediumtext', { nullable: true })
  description?: string | null;

  @Column('boolean', { default: false })
  favorite: boolean;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.chatbots, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Relation<ProjectEntity>;

  @ManyToOne(() => UserEntity, (user) => user.chatbots)
  @JoinColumn({ name: 'created_by' })
  user: Relation<UserEntity>;

  @OneToMany(
    () => MemberBotUsageEntity,
    (memberBotUsage) => memberBotUsage.chatbot,
    { cascade: cascadeOptions },
  )
  memberBotUsages: Relation<MemberBotUsageEntity[]>;

  constructor(chatbot: Partial<ChatbotEntity>) {
    Object.assign(this, chatbot);
  }
}
