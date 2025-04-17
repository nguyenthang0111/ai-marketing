import { Exclude } from 'class-transformer';
import { CreditCodeInterface } from './../interfaces/credit-code.interface';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Relation,
} from 'typeorm';
import { WorkspaceEntity } from 'src/models/workspace/entities/workspace.entity';

export enum CreditCodeStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  USED_UP = 'USED UP',
}

@Entity({ name: 'credit_code' })
export class CreditCodeEntity implements CreditCodeInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'code' })
  code: string;

  @Column('string', { name: 'workspace_id' })
  workspaceId: string;

  @Column('int', { name: 'total_credits' })
  totalCredits: number;

  @Column('int', { name: 'used_credits', default: 0 })
  usedCredits: number;

  @Column('timestamp', { name: 'effective_date' })
  effectiveDate: Date;

  @Column('timestamp', { name: 'expiration_date' })
  expirationDate: Date;

  @Column('enum', {
    enum: CreditCodeStatus,
    name: 'status',
    default: CreditCodeStatus.ACTIVE,
  })
  status: CreditCodeStatus;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => WorkspaceEntity, (workspace) => workspace.creditCodes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'workspace_id' })
  workspace: Relation<WorkspaceEntity>;

  constructor(partial: Partial<CreditCodeEntity>) {
    Object.assign(this, partial);
  }
}
