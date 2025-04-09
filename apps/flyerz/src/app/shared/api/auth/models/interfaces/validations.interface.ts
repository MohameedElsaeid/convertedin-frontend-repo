export interface Validations {
  createAd: {
    minBudget: number;
    minDays: number;
    perDay: number;
  };
  invitation: {
    inviteeAmount: number;
    inviterAmount: number;
  };
  recharge: {
    minAmount: number;
  };
  reviewAd: {
    minAmount: number;
  };
  country: {
    id: number;
    flag: string;
    key: string;
    name: string;
  };
  currency: {
    id: number;
    name: string;
    symbol: string;
  };
}
