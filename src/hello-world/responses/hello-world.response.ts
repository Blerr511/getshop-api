import { plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { RegisterPaymentResult } from '@getshop/arca-ipay/ipay-rest-api/types';

export class HelloWorldResponse {
  @ApiProperty({
    example: 'Hello Gago Smith',
  })
  message: string;

  static from(payload: HelloWorldResponse): HelloWorldResponse {
    return plainToClass(HelloWorldResponse, payload);
  }
}

export class RegisterPaymentResponse implements RegisterPaymentResult {
  @ApiProperty()
  orderId: string;

  @ApiProperty()
  formUrl: string;

  static from(payload: RegisterPaymentResult): RegisterPaymentResponse {
    return plainToClass(RegisterPaymentResponse, payload);
  }
}
