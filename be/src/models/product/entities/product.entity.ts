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
import { ProductInterface } from '../interfaces/product.interface';
import { Exclude, Transform } from 'class-transformer';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { ProjectEntity } from 'src/models/project/entities/project.entity';

@Entity({ name: 'product' })
export class ProductEntity implements ProductInterface {
  @PrimaryGeneratedColumn('uuid', { name: 'product_id' })
  productId: string;

  @Exclude()
  @Column('uuid', { name: 'project_id' })
  projectId: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('mediumtext', { nullable: true })
  description?: string | null;

  @Column('mediumtext', { nullable: true })
  benefit?: string | null;

  @Column('mediumtext', { nullable: true })
  promotion?: string | null;

  @Column('mediumtext', { nullable: true, name: 'customer_persona' })
  customerPersona?: string | null;

  @Column('mediumtext', { nullable: true, name: 'customer_problem' })
  customerProblem?: string | null;

  @Column('mediumtext', { nullable: true, name: 'solution' })
  solution?: string | null;

  @Exclude()
  @Column('uuid', { name: 'created_by' })
  createdBy: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at' })
  deletedAt: Date;

  @Exclude()
  @ManyToOne(() => ProjectEntity, (project) => project.products, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Relation<ProjectEntity>;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'created_by' })
  user: Relation<UserEntity>;

  constructor(product: Partial<ProductEntity>) {
    Object.assign(this, product);
  }
}
