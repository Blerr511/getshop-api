import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
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
  userId: number;

  @OneToOne(() => User)
  user: User;

  @Column()
  expireDate: Date;

  @Column()
  token: string;
}
