import { FactoryProvider } from '@nestjs/common';

export interface IPayOptions {
  username: string;
  password: string;
  baseUrl: string;
}

export type IPayOptionsFactory = FactoryProvider<IPayOptions>;
