import { ConfigModuleOptions } from '@nestjs/config';
import { APP_ENV, validate } from './validation-schema';

export const configOptions: ConfigModuleOptions = {
  validate,
  envFilePath: process.env.NODE_ENV === APP_ENV.test ? '.env.test' : '.env',
};
