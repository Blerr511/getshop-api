import { ConfigService } from '@nestjs/config';
import { APP_ENV, ConfigSchema } from './validation-schema';
import { Injectable } from '@nestjs/common';
@Injectable()
export class GetConfigService {
  constructor(private readonly nestConfigService: ConfigService) {}
  safeGet<K extends keyof ConfigSchema>(key: K): ConfigSchema[K] {
    const value = this.nestConfigService.get<ConfigSchema[K]>(key);

    if (value === undefined || value === null) {
      throw new Error(`${key} is not set`);
    }

    return value;
  }

  get AppEnv(): {
    isProd(): boolean;
    isDev(): boolean;
    isTest(): boolean;
  } {
    return {
      isProd: (): boolean => {
        return this.safeGet('NODE_ENV') === APP_ENV.prod;
      },
      isDev: (): boolean => {
        return this.safeGet('NODE_ENV') === APP_ENV.dev;
      },
      isTest: (): boolean => {
        return this.safeGet('NODE_ENV') === APP_ENV.test;
      },
    };
  }
}
