export interface PaymentConfiguration {
  name: string;
  amount: number;
  type: 'percentage' | 'fixed' | string;
  userPercentage: number | null;
  vat: number;
  percentages: PaymentConfigurationPercentageItem[];
}

export interface PaymentConfigurationPercentageItem {
  percentage: number;
  from: number;
  to: number;
}
