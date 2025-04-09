export interface ReferralParams {
  limit: number;
  offset: number;
}

export interface ReferralResponse {
  referral: Referral;
  earnings: Earnings;
  invitedUsers: InvitedUsers;
}

export interface Referral {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
}

export interface Earnings {
  total: number;
  currentPromotionalWalletBalance: number;
}

export interface InvitedUser {
  amount: number;
  firstName: string;
  lastName: string;
  status: 'pending' | 'completed' | 'failed';
}
export interface InvitedUsers {
  count: number;
  users: InvitedUser[];
}
