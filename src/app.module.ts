import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DBModule } from './db/postgres/db.module';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { PaymentModule } from './payment/payment.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { HelperModule } from '@modules/helpers/helper.module';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule,
    DBModule,
    HelloWorldModule,
    PaymentModule,
    WalletModule,
    HelperModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
