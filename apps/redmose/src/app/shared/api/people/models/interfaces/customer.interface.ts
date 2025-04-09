export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  orders_count: number;
  total_spent: number;
  avg_order_value: number;
  gender: string;
  valid_phone: 1 | 0 | null;
  valid_email: 1 | 0 | null;
  accept_email_marketing: 1 | 0 | null,
  accept_sms_marketing: 1 | 0 | null,
  created_at: string;
  updated_at: string;
}
