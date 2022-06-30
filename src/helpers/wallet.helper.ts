import { Injectable } from '@nestjs/common';
import { GetConfigService } from '@modules/config/get-config.service';
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const initVector = crypto.randomBytes(16);
const SecurityKey = crypto.randomBytes(32);
const cipher = crypto.createCipheriv(algorithm, SecurityKey, initVector);

@Injectable()
export class WalletHelper {
  constructor(private readonly configService: GetConfigService) {}
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
    let encryptedData = cipher.update(text, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');

    return encryptedData;
  }

  decodeWallet(text): string {
    const decipher = crypto.createDecipheriv(
      algorithm,
      SecurityKey,
      initVector,
    );
    let decryptedData = decipher.update(text, 'hex', 'utf-8');
    decryptedData += decipher.final('utf8');

    return decryptedData;
  }
}
