export interface Register {
  mobileNumber: string;
  countryCode: string;
  otp: string;
  firstName: string;
  lastName: string;
  countryId: number;
  advertisingId?: number;
  appsflyerId?: number;
  password: string;
  passwordConfirmation: string;
}
