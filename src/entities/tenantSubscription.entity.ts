import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from '@modules/entities/tenant.entity';
import { Tariff } from '@modules/entities/tariff.entity';

@Entity()
export class TenantSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  activeFrom: Date;

  @Column()
  activeUntil: Date;

  @OneToOne(() => Tenant, (tenant) => tenant.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  tenant: Tenant;

  @ManyToOne(() => Tariff, (tariff) => tariff.id)
  @JoinColumn()
  tariff: Tariff;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
