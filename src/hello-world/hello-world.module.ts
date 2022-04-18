import { Module } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';
import { HelloWorldController } from './hello-world.controller';
import { ArcaIpayModule } from '@getshop/arca-ipay';
import { GetConfigService } from '@modules/config/get-config.service';
import { IpayRestApi } from '@getshop/arca-ipay/ipay-rest-api/ipay-rest-api.module';
import { ConfigModule } from '@modules/config/config.module';

@Module({
  imports: [
    ConfigModule,
    IpayRestApi,
    ArcaIpayModule.forRootAsync({
      useFactory(configService: GetConfigService) {
        return {
          baseUrl: configService.safeGet('IPAY_API_URL'),
          password: configService.safeGet('IPAY_PASSWORD'),
          username: configService.safeGet('IPAY_USERNAME'),
        };
      },
      inject: [GetConfigService],
    }),
  ],
  providers: [HelloWorldService],
  controllers: [HelloWorldController],
})
export class HelloWorldModule {}
