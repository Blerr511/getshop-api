import { Global, Module } from '@nestjs/common';
import { WalletHelper } from './wallet.helper';
import { EmailHelper } from './email.helper';
import { ConfigModule } from '@modules/config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [WalletHelper, EmailHelper],
  exports: [WalletHelper, EmailHelper],
})
export class HelperModule {}
