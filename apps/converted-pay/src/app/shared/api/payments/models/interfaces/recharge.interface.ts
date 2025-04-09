export interface RechargePayload {
  amount: number;
  paymentId: number;
  socialPlatformId: number;
  usePromotionalBalance?: boolean;
  countryCode?: string;
  mobileNumber?: string;
  countryId: string;
}
