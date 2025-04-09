import { AdStatus } from '../enums';

export interface Ad {
  referenceNo: string;
  id: number;
  image: string;
  message: string;
  budget: number;
  isActive: boolean;
  days: number;
  startAt: string;
  endAt: string;
  url?: string;
  adminStatus: string;
  facebookStatus: string;
  type: {
    id: number;
    name: string;
  };
  status: {
    id: number;
    name: string;
  };
  goal: {
    id: number;
    name: string;
  };
  rejection?: {
    reason?: string;
    rejected_by?: {
      id: number;
      name: string;
    };
  };
}
