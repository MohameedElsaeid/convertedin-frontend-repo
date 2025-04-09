import { ConnectedAccount } from './connected-account.interface';
import { Currency } from './currency.interfacee';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  mobileNumber: string;
  countryCode: string;
  facebookMonthlyBudget: string;
  googleMonthlyBudget: string;
  facebookPageUrl: string;
  whenToStart: string;
  taxNumber?: string;
  isInWaitingList: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  isProfileCompleted: boolean;
  connectedAccounts?: ConnectedAccount[];
  token: string;
  taxCardPAth?: string;
  fbcUpdated: boolean;
  fbpUpdated: boolean;
  currency: Currency;
  isSenderFreeCreditEnabled: boolean;
  senderFreeCreditValue: number;
  isReceiverFreeCreditEnabled: boolean;
  receiverFreeCreditValue: number;
  minimumRechargeValue: number;
  vat: number;
  country_id: number;
}
