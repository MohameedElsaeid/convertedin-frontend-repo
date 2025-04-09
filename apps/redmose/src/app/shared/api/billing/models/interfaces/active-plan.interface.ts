export interface ActivePlanInterface {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  is_user_current_plan: boolean;
  features: string[];
}
