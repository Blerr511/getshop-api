import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { GetConfigService } from './get-config.service';
import { configOptions } from './options';

@Module({
  imports: [NestConfigModule.forRoot(configOptions)],
  providers: [GetConfigService],
  exports: [GetConfigService],
})
export class ConfigModule {}
