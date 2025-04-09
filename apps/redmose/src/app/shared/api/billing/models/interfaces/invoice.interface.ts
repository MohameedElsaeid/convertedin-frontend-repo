export interface InvoiceInterface {
  id: number;
  number: string;
  pdf: string;
  subscription_id: number;
  status: string;
  type: number;
  total: string;
  created_at: string;
}
