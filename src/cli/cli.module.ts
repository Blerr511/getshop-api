import { DBModule } from '../db/postgres/db.module';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';
import { DevCommands } from './dev/dev.commands';
import { ConfigModule } from '@modules/config/config.module';

@Module({
  imports: [ConfigModule, CommandModule, DBModule],
  providers: [DevCommands],
})
export class CliModule {}
