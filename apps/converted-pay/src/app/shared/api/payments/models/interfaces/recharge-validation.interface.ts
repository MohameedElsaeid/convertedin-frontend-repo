export interface RechargeValidation {
  channels: RechargeValidationItem[];
  totalEarnings: number;
  userPromotionalWalletBalance: number;
}
export interface RechargeValidationItem {
  channelId: number;
  channelName: string;
  minimumRechargeAmount: number;
  userPercentage: number | null;
  vat: number;
  percentages: Percentage[];
}
export interface Percentage {
  percentage: number;
  from: number;
  to: number;
}
