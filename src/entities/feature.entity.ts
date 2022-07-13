import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ConstraintsEnum } from '@modules/entities/constraints.enum';
import { Tariff } from '@modules/entities/tariff.entity';

@Entity()
@Unique(ConstraintsEnum.uniqueFeatureName, ['name'])
export class Feature {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: false })
  description: string;

  @ManyToMany(() => Tariff, (tariff) => tariff.id)
  @JoinTable()
  tariff: Tariff[];
}
