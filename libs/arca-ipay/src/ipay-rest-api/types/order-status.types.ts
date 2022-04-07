import {
  Currency,
  Language,
  PaymentInternalParams,
  PaymentState,
} from './shared.types';

export interface OrderStatusExternalParams {
  oderId: string;
  orderNumber: string;
  language?: Language;
}

export type OrderStatusParams = OrderStatusExternalParams &
  PaymentInternalParams;

export interface PaymentAttribute {
  name: string;
  value: string;
}

export interface PaymentAmountInfo {
  paymentState: PaymentState;
  approvedAmount: number;
  depositedAmount: number;
  refundedAmount: number;
}

export interface BankInfo {
  bankCountryCode: string;
  bankCountryName: string;
}

export interface OrderStatusResult {
  orderStatus: number;
  actionCode: number;
  actionCodeDescription: string;
  amount: number;
  currency: Currency;
  /**
   * Timestamp in milliseconds
   */
  date: number;
  orderDescription: string;
  merchantOrderParams: [];
  attributes: PaymentAttribute[];
  paymentAmountInfo: PaymentAmountInfo;
  bankInfo: BankInfo;
}
