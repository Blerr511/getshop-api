import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  RegisterPaymentExternalParams,
  RegisterPaymentParams,
  RegisterPaymentResult,
  OrderStatusExternalParams,
  OrderStatusParams,
  OrderStatusResult,
} from './types';
import { GetConfigService } from '@modules/config/get-config.service';
import { IPayResponse, IPaySuccessResponse, isOkPipe } from './api-utils';
import { firstValueFrom, map } from 'rxjs';
import { PaymentInternalParams } from './types/shared.types';

@Injectable()
export class IPayRestApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: GetConfigService,
  ) {}

  async register(
    paymentParams: RegisterPaymentExternalParams,
  ): Promise<IPaySuccessResponse<RegisterPaymentResult>> {
    const params: RegisterPaymentParams = {
      ...paymentParams,
      ...this.internalParams(),
    };

    return firstValueFrom(
      this.httpService
        .post<IPayResponse<RegisterPaymentResult>>('/register.do', null, {
          params,
        })
        .pipe(map(isOkPipe)),
    );
  }

  async orderStatus(
    orderParams: OrderStatusExternalParams,
  ): Promise<IPaySuccessResponse<OrderStatusResult>> {
    const params: OrderStatusParams = {
      ...orderParams,
      ...this.internalParams(),
    };

    return firstValueFrom(
      this.httpService
        .post('/getOrderStatusExtended.do', null, { params })
        .pipe(map(isOkPipe)),
    );
  }

  private internalParams(): PaymentInternalParams {
    const internalParams = {
      userName: this.configService.safeGet('IPAY_USERNAME'),
      password: this.configService.safeGet('IPAY_PASSWORD'),
    };

    return internalParams;
  }
}
