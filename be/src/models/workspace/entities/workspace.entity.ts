import { Exclude } from 'class-transformer';
import { WorkspaceInterface } from './../interfaces/workspace.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { WorkspaceLogEntity } from 'src/models/workspace-log/entities/workspace-log.entity';
import { WorkspaceMemberEntity } from 'src/models/workspace-member/entities/workspace-member.entity';
import { ProjectEntity } from 'src/models/project/entities/project.entity';
import { CreditCodeEntity } from 'src/models/credit-code/entities/credit-code.entity';
import { MemberBotUsageEntity } from 'src/models/member-bot-usage/entities/member-bot-usage.entity';

export enum WorkspacePlan {
  FREE = 'FREE',
  PRO = 'PRO',
  TEAM = 'TEAM',
  BETA = 'BETA',
}

const cascadeOptions: ('insert' | 'update' | 'remove')[] = [
  // 'insert',
  'update',
  'remove',
];

@Entity({ name: 'workspace' })
export class WorkspaceEntity implements WorkspaceInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'workspace_id' })
  workspaceId: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: WorkspacePlan,
    default: WorkspacePlan.FREE,
  })
  plan: WorkspacePlan;

  @Column({ type: 'int', name: 'duration' })
  duration: number;

  @Column({ type: 'timestamp', name: 'plan_expiry_date' })
  planExpiryDate: Date;

  @Column({ type: 'int', name: 'total_projects' })
  totalProjects: number;

  @Column({ type: 'int', name: 'total_bots' })
  totalBots: number;

  @Column({ type: 'int', name: 'total_members' })
  totalMembers: number;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @OneToMany(() => ProjectEntity, (project) => project.workspace, {
    cascade: cascadeOptions,
  })
  projects: ProjectEntity[];

  @OneToMany(
    () => WorkspaceMemberEntity,
    (workspaceMember) => workspaceMember.workspace,
    {
      cascade: cascadeOptions,
    },
  )
  workspaceMembers: WorkspaceMemberEntity[];

  @OneToMany(
    () => WorkspaceLogEntity,
    (workspaceLog) => workspaceLog.workspace,
    { cascade: cascadeOptions },
  )
  workspaceLogs: WorkspaceLogEntity[];

  @OneToMany(() => CreditCodeEntity, (creditCode) => creditCode.workspace, {
    cascade: cascadeOptions,
  })
  creditCodes: CreditCodeEntity[];

  @OneToMany(
    () => MemberBotUsageEntity,
    (memberBotUsage) => memberBotUsage.workspace,
    {
      cascade: cascadeOptions,
    },
  )
  memberBotUsages: MemberBotUsageEntity[];

  constructor(partial: Partial<WorkspaceEntity>) {
    Object.assign(this, partial);
  }
}
