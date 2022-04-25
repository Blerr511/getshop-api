import { Global, Module } from '@nestjs/common';
import { WalletHelper } from './wallet.helper';
import { EmailHelper } from './email.helper';

@Global()
@Module({
  imports: [],
  providers: [WalletHelper, EmailHelper],
  exports: [WalletHelper, EmailHelper],
})
export class HelperModule {}
