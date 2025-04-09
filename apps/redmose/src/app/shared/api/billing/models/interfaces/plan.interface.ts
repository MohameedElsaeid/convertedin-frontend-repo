export interface BillingPlan {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  is_user_current_plan: boolean;
  features: string[];
  user_can_swap: boolean;
}
