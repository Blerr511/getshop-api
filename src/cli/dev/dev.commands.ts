import { Injectable, Logger } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { GetConfigService } from '@modules/config/get-config.service';

@Injectable()
export class DevCommands {
  private readonly logger = new Logger(DevCommands.name);

  @InjectConnection() private readonly connection: Connection;

  constructor(private readonly configService: GetConfigService) {}

  @Command({
    command: 'db:drop',
  })
  async dropDb(): Promise<void> {
    try {
      if (!this.configService.AppEnv.isDev()) {
        throw new Error(`Db Drop allowed only for dev environment`);
      }
      await this.connection.dropDatabase();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
