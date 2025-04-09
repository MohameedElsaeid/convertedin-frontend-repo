export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  access_token: string;
  email_verified?: boolean;
}
