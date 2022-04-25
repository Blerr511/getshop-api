import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { GetConfigService } from '@modules/config/get-config.service';

@Injectable()
export class EmailHelper {
  constructor(private readonly configService: GetConfigService) {}

  sendWalletSendEmail(
    email: string,
    walletUsername: string,
    walletPassword: string,
  ): void {
    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.safeGet('WALLET_EMAIL_USERNAME'),
        pass: this.configService.safeGet('WALLET_EMAIL_PASSWORD'),
      },
    });
    const message = {
      to: email,
      subject: 'GetShop',
      html: `${walletUsername}; ${walletPassword}`,
    };
    transporter.sendMail(message, (err) => {
      if (err) return err;
      return true;
    });
  }
}
