export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  countryCode: string;
  mobileNumber: string;
  password: string;
  passwordConfirmation: string;
  referralCode?:string;
  query:any;
}

export interface CompleteRegisterPayload {
  // facebookMonthlyBudget: string;
  // googleMonthlyBudget: string;
  advertiserType:string;
  whenToStart: string;
  facebookUrlPage: string;
}
