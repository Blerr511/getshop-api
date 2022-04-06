import { HttpModule } from '@nestjs/axios';
import { DynamicModule, FactoryProvider, Inject, Module } from '@nestjs/common';
import { ArcaIpayService } from './arca-ipay.service';
import { IPAY_OPTIONS_TOKEN } from './const';
import { IPayOptions } from './types/IPayOptions';
import {
  createOptionsFactoryProvider,
  createOptionsProvider,
} from './utils/createOptionsProvider';

const imports = [HttpModule];
const services = [ArcaIpayService];
const exportedServices = [ArcaIpayService];

@Module({})
export class ArcaIpayModule {
  constructor(@Inject(IPAY_OPTIONS_TOKEN) readonly options: IPayOptions) {}

  static forRootAsync(
    options: Pick<FactoryProvider<IPayOptions>, 'useFactory' | 'inject'>,
  ): DynamicModule {
    const optionsProvider = createOptionsFactoryProvider(options);

    return {
      module: ArcaIpayModule,
      imports: [...imports],
      providers: [optionsProvider, ...services],
      exports: [...exportedServices],
    };
  }

  static forRoot(options: IPayOptions): DynamicModule {
    const optionsProvider = createOptionsProvider(options);

    return {
      module: ArcaIpayModule,
      imports: [...imports],
      providers: [optionsProvider, ...services],
      exports: [...exportedServices],
    };
  }
}
