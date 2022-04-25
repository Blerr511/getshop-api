import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailConfigOptions } from '@shared/constants/email-configuration.';

@Injectable()
export class EmailHelper {
  sendWalletSendEmail(
    email: string,
    walletUsername: string,
    walletPassword: string,
  ): void {
    const transporter = nodemailer.createTransport(EmailConfigOptions);
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
