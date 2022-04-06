import { Injectable } from '@nestjs/common';
import { IPayRestApiService } from './ipay-rest-api/ipay-rest-api.service';
import {
  RegisterPaymentExternalParams,
  RegisterPaymentResult,
} from './ipay-rest-api/types';

@Injectable()
export class ArcaIpayService {
  constructor(private readonly IPayRestApi: IPayRestApiService) {}

  async registerPayment(
    params: RegisterPaymentExternalParams,
  ): Promise<RegisterPaymentResult> {
    return this.IPayRestApi.register(params).then((result) => ({
      formUrl: result.formUrl,
      orderId: result.orderId,
    }));
  }
}
