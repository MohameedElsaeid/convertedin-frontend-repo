export interface CustomerAccount {
  id: string;
  manager_id: number;
  customer_id: string;
  name: string;
  is_primary: boolean;
  currency: string;
}
