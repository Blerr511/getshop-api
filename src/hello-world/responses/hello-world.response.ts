import { plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class HelloWorldResponse {
  @ApiProperty({
    example: 'Hello Gago Smith',
  })
  message: string;

  static from(payload: HelloWorldResponse): HelloWorldResponse {
    return plainToClass(HelloWorldResponse, payload);
  }
}
