export interface CurrentQuotaInterface {
  id: number;
  feature: string;
  OldRecurredQuotas: OldRecurredQuotas[] | null;
  is_primary: number;
  is_active: number;
  total_quota: number;
  total_price: number | null;
  quota_type: string;
  spent_quota: number;
  remained_quota: number;
  remained_budget: number | null;
  currency: string;
  purchase_date: string;
  quota_id: number;
  expires_at: string;
  created_at: string;
  isExpired?: boolean;
}

interface OldRecurredQuotas {
  id: number;
  feature: string;
  oldRecurredQuotas: OldRecurredQuotas;
  is_primary: 1 | 0;
  is_active: 1 | 0;
  total_quota: number;
  total_price: number;
  quota_type: string;
  spent_quota: number;
  remained_quota: number;
  remained_budget: number;
  currency: string;
  purchase_date: string;
  quota_id: number;
  expires_at: string;
  created_at: string;
}
