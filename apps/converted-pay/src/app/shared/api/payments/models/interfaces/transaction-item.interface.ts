export interface TransactionItem {
  paymentMethodName: string;
  socialPlatformName: string;
  socialPlatformDescription: string;
  transactionId: number;
  transactionCurrency: string;
  transactionStatus: {
    id: 'paid' | 'pending' | 'unpaid' | string;
    value: string;
  };
  transactionNetAmount: number;
  transactionCreatedAt: string;
  transactionPaidAt?: string;
}
