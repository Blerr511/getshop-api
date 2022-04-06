import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  RegisterPaymentExternalParams,
  RegisterPaymentInternalParams,
  RegisterPaymentResult,
} from './types';
import { GetConfigService } from '@modules/config/get-config.service';
import { IPayResponse, IPaySuccessResponse, isOkPipe } from './api-utils';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class IPayRestApiService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: GetConfigService,
  ) {}

  async register(
    paymentParams: RegisterPaymentExternalParams,
  ): Promise<IPaySuccessResponse<RegisterPaymentResult>> {
    return firstValueFrom(
      this.httpService
        .post<IPayResponse<RegisterPaymentResult>>('/register.do', null, {
          params: {
            ...paymentParams,
            ...this.internalParams(),
          },
        })
        .pipe(map(isOkPipe)),
    );
  }

  private internalParams(): RegisterPaymentInternalParams {
    const internalParams = {
      username: this.configService.safeGet('IPAY_USERNAME'),
      password: this.configService.safeGet('IPAY_PASSWORD'),
    };

    return internalParams;
  }
}
