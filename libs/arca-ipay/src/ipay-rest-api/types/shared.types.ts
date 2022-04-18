export interface PaymentInternalParams {
  userName: string;
  password: string;
}

export type PaymentState = 'CREATED';

export type Language = string;

export type Currency = number;

export enum PageView {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
}
