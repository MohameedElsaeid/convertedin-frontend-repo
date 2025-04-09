export interface UpdatePasswordPayload {
  email: string;
  otp: string;
  password: string;
  passwordConfirmation: string;
}
