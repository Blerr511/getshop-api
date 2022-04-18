import { ConfigModule } from '@modules/config/config.module';
import { GetConfigService } from '@modules/config/get-config.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { IPayRestApiService } from './ipay-rest-api.service';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useFactory(configService: GetConfigService) {
        return {
          baseURL: configService.safeGet('IPAY_API_URL'),
        };
      },
      inject: [GetConfigService],
      imports: [ConfigModule],
    }),
  ],
  providers: [IPayRestApiService],
  exports: [IPayRestApiService],
})
export class IpayRestApi {}
