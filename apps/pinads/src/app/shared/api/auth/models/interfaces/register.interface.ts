export interface Register {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  business_category: string;
  business_name: string;
  utm_medium?: string;
  utm_source?: string;
}
