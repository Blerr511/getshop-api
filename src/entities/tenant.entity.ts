import {
  Column,
  CreateDateColumn,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { ConstraintsEnum } from '@modules/entities/constraints.enum';
import { TenantSubscription } from '@modules/entities/tenantSubscription.entity';

@Entity()
@Unique(ConstraintsEnum.uniqueTenantName, ['name'])
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(
    () => TenantSubscription,
    (tenantSubscription) => tenantSubscription.tenant,
    {
      cascade: true,
    },
  )
  tenantSubscription: TenantSubscription;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
