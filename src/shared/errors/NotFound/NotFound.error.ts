import { HttpException } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor(message?: string) {
    super(message, 404);
  }
}
