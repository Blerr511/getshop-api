import { DynamicModule, FactoryProvider, Inject, Module } from '@nestjs/common';
import { ArcaIpayService } from './arca-ipay.service';
import { IPAY_OPTIONS_TOKEN } from './const';
import { IPayOptions, IPayOptionsFactory } from './types/IPayOptions';

@Module({
  providers: [ArcaIpayService],
  exports: [ArcaIpayService],
})
export class ArcaIpayModule {
  constructor(@Inject(IPAY_OPTIONS_TOKEN) readonly options: IPayOptions) {}

  static forRootAsync(options: FactoryProvider<IPayOptions>): DynamicModule {
    return {
      module: ArcaIpayModule,
      providers: [options],
    };
  }

  static forRoot(options: IPayOptions): DynamicModule {
    return {
      module: ArcaIpayModule,
      providers: [
        {
          provide: IPAY_OPTIONS_TOKEN,
          useValue: options,
        },
      ],
    };
  }
}
