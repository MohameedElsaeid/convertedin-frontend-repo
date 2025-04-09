export interface CustomerDetails {
  id: number;
  first_name: string;
  last_name: string;
  short_name: string[];
  email: string;
  phone: string | null;
  state: 'enabled' | 'disabled';
  orders_count: number;
  total_spent: number;
  avg_order_value: number;
  currency: string;
  last_activity: string;
  orders: Order[];
  segments: Segment[];
  addresses: Address[];
}

interface Order {
  id: number;
  order_number: string;
  total_price: number;
  financial_status: 'paid' | 'pending' | 'refunded'; // Add more statuses if necessary
  mapped_status: 'in_progress' | 'completed' | 'cancelled'; // Add more statuses if necessary
  ordered_at: string; // Assuming this is a date string, it could be more specific if necessary
}

interface Address {
  city: string;
  country: string;
  default: number;
}

interface Segment {
  id: number;
  rule: string;
}
