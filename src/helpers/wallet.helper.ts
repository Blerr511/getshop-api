import { Injectable } from '@nestjs/common';
import * as Cryptr from 'cryptr';
import { GetConfigService } from '@modules/config/get-config.service';

@Injectable()
export class WalletHelper {
  private cryptr: Cryptr;
  constructor(private readonly configService: GetConfigService) {
    this.cryptr = new Cryptr(configService.safeGet('CRYPTO_SECRET_KEY'));
  }
  generatePassword(): string {
    const length = 16;
    const charset = this.configService.safeGet(
      'WALLET_GENERATE_PASSWORD_SECRET',
    );
    let generatePass = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      generatePass += charset.charAt(Math.floor(Math.random() * n));
    }
    return generatePass;
  }

  hashWallet(text: string): string {
    return this.cryptr.encrypt(text);
  }

  decodeWallet(text: string): string {
    return this.cryptr.decrypt(text);
  }
}
