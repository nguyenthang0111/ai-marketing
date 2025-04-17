import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  JoinColumn,
} from 'typeorm';
import { MemberBotUsageInterface } from '../interfaces/member-bot-usage.interface';
import { BotSocialEntity } from 'src/models/bot-social/entities/bot-social.entity';
import { BotWebEntity } from 'src/models/bot-web/entities/bot-web.entity';
import { ChatbotEntity } from 'src/models/chatbot/entities/chatbot.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';

@Entity({ name: 'member_bot_usage' })
export class MemberBotUsageEntity implements MemberBotUsageInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column('uuid', { name: 'user_id' })
  userId: string;

  @Column('uuid', { name: 'workspace_id' })
  workspaceId: string;

  @Column('uuid', { name: 'bot_social_id', nullable: true, default: null })
  botSocialId: string | null;

  @Column('uuid', { name: 'bot_web_id', nullable: true, default: null })
  botWebId: string | null;

  @Column('uuid', { name: 'chatbot_id', nullable: true, default: null })
  chatbotId: string | null;

  @Column({
    type: 'timestamp',
    name: 'last_used_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUsedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.memberBotUsages)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.memberBotUsages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Relation<WorkspaceEntity>;

  @ManyToOne(() => BotSocialEntity, (botSocial) => botSocial.memberBotUsages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bot_social_id' })
  botSocial: Relation<BotSocialEntity> | null;

  @ManyToOne(() => BotWebEntity, (botWeb) => botWeb.memberBotUsages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bot_web_id' })
  botWeb: Relation<BotWebEntity> | null;

  @ManyToOne(() => ChatbotEntity, (chatbot) => chatbot.memberBotUsages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'chatbot_id' })
  chatbot: Relation<ChatbotEntity> | null;

  constructor(partial: Partial<MemberBotUsageEntity>) {
    Object.assign(this, partial);
  }
}
