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

  @IsString()
  OIDC_ISSUER: string;

  @IsString()
  REDIRECT_URL: string;

  @IsString()
  CLIENT_SECRET: string;

  @IsString()
  CLIENT_ID: string;

  @IsString()
  CLIENT_AUTH_CALLBACK_URI: string;

  @IsString()
  CORS_ORIGIN: string;

  @IsString()
  SESSION_SECRET: string;

  @IsString()
  IPAY_API_URL: string;

  @IsString()
  IPAY_USERNAME: string;

  @IsString()
  IPAY_PASSWORD: string;

  @IsString()
  CRYPTO_SECRET_KEY: string;

  @IsString()
  WALLET_GENERATE_PASSWORD_SECRET: string;

  @IsString()
  WALLET_EMAIL_USERNAME: string;

  @IsString()
  WALLET_EMAIL_PASSWORD: string;
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
