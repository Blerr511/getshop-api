import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  Unique,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
@Unique('REFRESH_TOKEN_EACH_USER', ['userId'])
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => User)
  @JoinColumn({ name: 'id' })
  userId: number;

  @Column()
  expireDate: Date;

  @Column()
  token: string;
}
