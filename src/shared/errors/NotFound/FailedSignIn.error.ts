import { NotFoundError } from './NotFound.error';

export class FailedSignInError extends NotFoundError {
  constructor() {
    super('Incorrect email or password');
  }
}
