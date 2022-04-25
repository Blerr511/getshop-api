import { Injectable } from '@nestjs/common';
import * as Cryptr from 'cryptr';
const cryptr = new Cryptr(process.env.CRYPTO_SECRET_KEY);

@Injectable()
export class WalletHelper {
  generatePassword(): string {
    const length = 16;
    const charset = process.env.WALLET_GENERATE_PASSWORD_SECRET;
    let generatePass = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
      generatePass += charset.charAt(Math.floor(Math.random() * n));
    }
    return generatePass;
  }

  hashWallet(text: string): string {
    return cryptr.encrypt(text);
  }

  decodeWallet(text: string): string {
    return cryptr.decrypt(text);
  }
}
