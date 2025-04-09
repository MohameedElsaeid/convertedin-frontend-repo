import { WorkFlowAction } from '../enums';

export interface FlowsListingItem {
  id: number;
  name: string;
  channels: WorkFlowAction[];
  language: string;
  status: string;
  published: 0 | 1;
  is_draft: 0 | 1;
  triggers: number;
  ordered: number;
  revenue: number;
  send: number;
  opened: number;
  clicked: number;
  click_rate: number;
  customers_count: number;
  activation_date: string;
  created_at: string;
  updated_at: string;
}
