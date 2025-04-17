import { Exclude } from 'class-transformer';
import { BrandInterface } from './../interfaces/brand.interface';
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
import { UserEntity } from 'src/models/user/entities/user.entity';
import { ProjectEntity } from 'src/models/project/entities/project.entity';

@Entity({ name: 'brand' })
export class BrandEntity implements BrandInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'brand_id' })
  brandId: string;

  @Exclude()
  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('mediumtext', { nullable: true })
  description?: string | null;

  @Column('mediumtext', { nullable: true })
  location?: string | null;

  @Column('mediumtext', { name: 'contact_info', nullable: true })
  contactInfo?: string | null;

  @Exclude()
  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @Exclude()
  @ManyToOne(() => ProjectEntity, (project) => project.brands, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Relation<ProjectEntity>;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.projects)
  @JoinColumn({ name: 'created_by' })
  user: Relation<UserEntity>;

  constructor(brand: Partial<BrandEntity>) {
    Object.assign(this, brand);
  }
}
