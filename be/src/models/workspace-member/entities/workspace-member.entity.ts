import { Exclude } from 'class-transformer';
import { WorkspaceMemberInterface } from '../interfaces/workspace-member.interface';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  Relation,
  UpdateDateColumn,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';

export enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

@Entity({ name: 'workspace_member' })
export class WorkspaceMemberEntity implements WorkspaceMemberInterface {
  @PrimaryColumn('uuid', { name: 'workspace_id' })
  workspaceId: string;

  @PrimaryColumn('uuid', { name: 'user_id' })
  userId: string;

  @Column('enum', { enum: MemberRole, default: MemberRole.MEMBER })
  role: MemberRole;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.workspaceMembers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Relation<WorkspaceEntity>;

  @ManyToOne(() => UserEntity, (user) => user.workspaceMembers)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  constructor(workspaceMember: Partial<WorkspaceMemberEntity>) {
    Object.assign(this, workspaceMember);
  }
}
