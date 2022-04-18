import { FactoryProvider, Provider } from '@nestjs/common';
import { IPAY_OPTIONS_TOKEN } from '../const';
import { IPayOptions } from '../types/IPayOptions';

export const createOptionsFactoryProvider = (
  options: Pick<FactoryProvider<IPayOptions>, 'useFactory' | 'inject'>,
): FactoryProvider => ({
  provide: IPAY_OPTIONS_TOKEN,
  useFactory: options.useFactory,
  inject: options.inject,
});

export const createOptionsProvider = (options: IPayOptions): Provider => ({
  provide: IPAY_OPTIONS_TOKEN,
  useValue: options,
});
