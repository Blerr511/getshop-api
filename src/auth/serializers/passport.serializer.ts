import { User } from '@modules/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { PassportSerializer as PassportSerializerBase } from '@nestjs/passport';
import { AuthService } from '../auth.service';

export type SerializedUser = number;

@Injectable()
export class PassportSerializer extends PassportSerializerBase {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(
    user: User,
    done: (err: Error, user: SerializedUser) => void,
  ): void {
    done(null, user.id);
  }

  deserializeUser(
    payload: SerializedUser,
    done: (err: Error, user: User) => void,
  ): void {
    this.authService.getUserById(payload).then((user) => done(null, user));
  }
}
