import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ConstraintsEnum } from '@modules/entities/constraints.enum';
import { Feature } from '@modules/entities/feature.entity';
import { TenantSubscription } from '@modules/entities/tenantSubscription.entity';
import { TariffPricing } from '@modules/entities/tariffPricing.entity';

@Entity()
@Unique(ConstraintsEnum.uniqueTariffName, ['name'])
export class Tariff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => Feature, (feature) => feature.id, { cascade: true })
  feature: Feature[];

  @OneToMany(
    () => TenantSubscription,
    (tenantSubscription) => tenantSubscription.tariff,
    { cascade: true },
  )
  tenantSubscription: TenantSubscription[];

  @OneToMany(() => TariffPricing, (tariffPricing) => tariffPricing.tariff, {
    cascade: true,
  })
  tariffPricing: TariffPricing[];
}
