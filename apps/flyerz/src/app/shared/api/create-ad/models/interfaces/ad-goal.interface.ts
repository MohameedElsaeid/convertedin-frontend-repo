import { AdGoals } from '@flyerz/shared/api/ads';

export interface AdGoal {
  id: AdGoals;
  type: string;
  status: boolean;
  title: string;
  description: string;
  destination?: number;
  images: {
    '1x': string;
    '2x': string;
    '3x': string;
  };
}
