import { AdGoals, AdStatus, ApprovalStatus, LearningStage } from '../enums';

export interface AdDetailsAdData {
  id: number;
  referenceNo: string;
  budget: number;
  days: number;
  spend: number;
  message: string;
  photo: string;
  attachments: Array<{
    type: string;
    links: string;
  }>;
  start_at: string;
  end_at: string;
  is_active: boolean;
  adminStatus: ApprovalStatus;
  facebookStatus: ApprovalStatus;
  learningStage: LearningStage;
  facebookPage: {
    id: string;
    name: string;
    image: string;
  };
  isReviewed: boolean;
  review: {};
  pixel: {};
  url: string;
  type: {
    id: number;
    name: string;
  };
  status: {
    id: AdStatus;
    name: string;
  };
  goal: {
    id: AdGoals;
    name: string;
  };
  rejection: {
    title?: string;
    reason?: string;
    solutionSteps?: string;
    rejected_by?: {
      id: number;
      name: string;
    };
  };
  createdAt: string | null;
  updatedAt: string | null;
}
