export interface RegisterPaymentInternalParams {
  username: string;
  password: string;
}

export type Language = string;

export type Currency = number;

export enum PageView {
  MOBILE = 'MOBILE',
  DESKTOP = 'DESKTOP',
}

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

export interface RegisterPaymentResult {
  orderId: string;
  formUrl: string;
}
