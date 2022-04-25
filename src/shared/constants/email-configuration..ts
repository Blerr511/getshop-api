export const EmailConfigOptions = {
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.WALLET_EMAIL_USERNAME,
    pass: process.env.WALLET_EMAIL_PASSWORD,
  },
};
