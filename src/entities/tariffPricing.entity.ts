import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tariff } from '@modules/entities/tariff.entity';

@Entity()
export class TariffPricing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  days: number;

  @Column()
  price: number;

  @Column()
  salePrice: number;

  @ManyToOne(() => Tariff, (tariff) => tariff.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tariff_id' })
  tariff: Tariff;
}
