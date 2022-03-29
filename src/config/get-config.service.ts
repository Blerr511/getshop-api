import { ConfigService } from '@nestjs/config';
import { ConfigSchema } from './validation-schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetConfigService {
  constructor(private readonly nestConfigService: ConfigService) {}
  safeGet<T = string>(key: keyof ConfigSchema): T {
    const value = this.nestConfigService.get<T>(key);
    if (!value) {
      throw new Error(`${key} is not set`);
    }

    return value;
  }
}
