import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DBModule } from './db/postgres/db.module';
import { HelloWorldModule } from './hello-world/hello-world.module';

@Module({
  imports: [ConfigModule, DBModule, HelloWorldModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
