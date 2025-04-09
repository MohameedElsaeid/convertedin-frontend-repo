export interface ProfileResponse {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  mobileNumber: string;
  countryCode: string;
  facebookMonthlyBudget: string;
  googleMonthlyBudget: string;
  whenToStart: string;
  isInWaitingList: boolean;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  taxNumber?: number;
  taxCardPAth?: any;
}

export interface ProfilePayload {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  taxNumber: string;
  mobileNumber: string;
  countryCode: string;
}

export interface UploadTaxResponse {
  message: string;
  filePath: string;
}
