import { ArcaIpayService } from '@getshop/arca-ipay';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { HelloWorldDto, RegisterPaymentQueryDto } from './dto/hello-world.dto';
import { HelloWorldService } from './hello-world.service';
import {
  HelloWorldResponse,
  RegisterPaymentResponse,
} from './responses/hello-world.response';

@Controller('hello-world')
export class HelloWorldController {
  constructor(
    private readonly helloWorldService: HelloWorldService,
    private readonly ipayService: ArcaIpayService,
  ) {}

  @Get('hello/:name')
  @ApiResponse({
    type: HelloWorldResponse,
  })
  helloWorld(@Param() { name }: HelloWorldDto): HelloWorldResponse {
    const message = this.helloWorldService.helloWorld({ name });

    return HelloWorldResponse.from({ message });
  }

  @Get('pay')
  @ApiResponse({
    type: RegisterPaymentResponse,
  })
  async payment(
    @Query() { amount, orderNumber }: RegisterPaymentQueryDto,
  ): Promise<RegisterPaymentResponse> {
    const result = await this.ipayService.registerPayment({
      amount,
      orderNumber,
      returnUrl: 'http://example.com',
    });

    return RegisterPaymentResponse.from(result);
  }
}
