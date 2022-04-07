import {
  Currency,
  Language,
  PageView,
  PaymentInternalParams,
} from './shared.types';

export interface RegisterPaymentExternalParams {
  orderNumber: string;
  amount: number;
  currency?: Currency;
  returnUrl: string;
  description?: string;
  language?: Language;
  pageView?: PageView;
  clientId?: string;
  jsonParams?: Record<string, unknown>;
  /**
   * Session duration in seconds
   */
  sessionTimeoutSecs?: number;
}

export type RegisterPaymentParams = RegisterPaymentExternalParams &
  PaymentInternalParams;

export interface RegisterPaymentResult {
  orderId: string;
  formUrl: string;
}
