import { WorkspaceLogInterface } from './../interfaces/workspace-log.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  JoinColumn,
  DeleteDateColumn,
} from 'typeorm';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';
import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/models/user/entities/user.entity';

export enum WorkspaceLogType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

@Entity({ name: 'workspace_log' })
export class WorkspaceLogEntity implements WorkspaceLogInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'log_id' })
  logId: string;

  @Column('uuid', { name: 'workspace_id' })
  workspaceId: string;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.workspaceLogs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Relation<WorkspaceEntity>;

  @Column('uuid', { name: 'made_by' })
  madeBy: string;

  @Column('enum', { enum: WorkspaceLogType, name: 'type' })
  type: WorkspaceLogType;

  @Column('mediumtext', { name: 'description', nullable: true })
  description?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.workspaceLogs)
  @JoinColumn({ name: 'made_by' })
  user: Relation<UserEntity>;

  constructor(workspaceLog: Partial<WorkspaceLogEntity>) {
    Object.assign(this, workspaceLog);
  }
}
