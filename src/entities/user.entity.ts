import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Wallet } from '@modules/entities/wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ unique: true, nullable: true })
  phoneNumber?: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ unique: true, nullable: true })
  sub?: string;

  @OneToMany(() => Wallet, (wallet) => wallet.user, {
    eager: true,
    onDelete: 'CASCADE',
  })
  wallet: Wallet;
}
