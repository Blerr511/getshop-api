import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ConfigModule } from '@modules/config/config.module';
import { GetConfigService } from '@modules/config/get-config.service';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory(configService: GetConfigService) {
        return {
          type: 'postgres',
          host: configService.safeGet('DB_HOST'),
          port: configService.safeGet('DB_PORT'),
          username: configService.safeGet('DB_USER'),
          password: configService.safeGet('DB_PASS'),
          database: configService.safeGet('DB_NAME'),
          autoLoadEntities: true,
          namingStrategy: new SnakeNamingStrategy(),
        };
      },
      inject: [GetConfigService],
      imports: [ConfigModule],
    }),
  ],
})
export class DBModule {}
