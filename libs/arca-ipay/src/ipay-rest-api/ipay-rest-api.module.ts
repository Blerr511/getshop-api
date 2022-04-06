import { GetConfigService } from '@modules/config/get-config.service';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory(configService: GetConfigService) {
        return {
          baseURL: configService.safeGet('IPAY_API_URL'),
        };
      },
      inject: [GetConfigService],
    }),
  ],
})
export class IpayRestApi {}
