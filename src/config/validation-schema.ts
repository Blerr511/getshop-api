import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

export enum APP_ENV {
  dev = 'development',
  prod = 'production',
  staging = 'staging',
  test = 'testing',
}

export class ConfigSchema {
  @IsEnum(APP_ENV)
  NODE_ENV: APP_ENV;

  @IsString()
  ACCESS_TOKEN_JWT_SECRET: string;

  @IsString()
  REFRESH_TOKEN_JWT_SECRET: string;

  @IsNumber()
  PORT: number;

  @IsString()
  API_PREFIX: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USER: string;

  @IsString()
  DB_PASS: string;
}

export const validate = (config: Record<string, unknown>): ConfigSchema => {
  const validatedConfig = plainToClass(ConfigSchema, config, {
    enableImplicitConversion: true,
    exposeDefaultValues: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
};
