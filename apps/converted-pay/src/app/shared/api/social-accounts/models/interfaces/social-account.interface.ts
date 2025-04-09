import { ConnectedAccount } from '@converted-pay/shared/api/auth';

export interface SocialAccount {
  id: number;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
  isBetaVersion: boolean;
  userInWaitingList: boolean;
  connectedAccounts?: Array<ConnectedAccount>;
  details: { google: GoogleDetails };
}
export interface GoogleDetails {
  resourceName: string;
  clientCustomer: string;
  name: string;
  level: string;
  timeZone: string;
  manager: string;
  currencyCode: string;
  adAccountId: string;
  adAccountStatus: string;
  createdAt: string;
}
