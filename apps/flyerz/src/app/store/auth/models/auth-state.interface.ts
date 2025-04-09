export interface AuthState {
  mobileNumber: string;
  countryCode: string;
  code: number;
  otp: string;
  firstName: string;
  lastName: string;
  passwordConfirmation?: string;
  password?: string;
}
