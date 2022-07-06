import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { CliModule } from './cli.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createApplicationContext(CliModule);

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    await app.close();
    process.exit(1);
  }
}

bootstrap();
