import { Exclude } from 'class-transformer';
import { DocumentInterface } from './../interfaces/document.interface';
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
import { ProjectEntity } from 'src/models/project/entities/project.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';

@Entity({ name: 'document' })
export class DocumentEntity implements DocumentInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'document_id' })
  documentId: string;

  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('mediumtext', { nullable: true })
  description?: string | null;

  @Column('longblob')
  content: string;

  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp' })
  deletedAt: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Relation<ProjectEntity>;

  @ManyToOne(() => UserEntity, (user) => user.documents)
  @JoinColumn({ name: 'created_by' })
  user: Relation<UserEntity>;

  constructor(partial: Partial<DocumentEntity>) {
    Object.assign(this, partial);
  }
}
