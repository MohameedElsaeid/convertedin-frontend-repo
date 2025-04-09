import { Suggestion } from '@flyerz/shared/api/create-ad';
import { AdDetailsAdData, AdDetailsAdInsights } from '.';

export interface AdDetails {
  ad: AdDetailsAdData;
  hasTechnicalIssue: boolean;
  technicalIssueMessage: string | null;
  hasReviewIssue: boolean;
  reviewIssueMessage: string | null;
  lead: {
    id: number | null;
    name: string | null;
  };
  insights: AdDetailsAdInsights;
  targeting: {
    interests: Suggestion[];
    demographics: Suggestion[];
    behaviors: Suggestion[];
    country: {
      id: number;
      name: string;
    };
    cities: Suggestion[];
    areas: Suggestion[];
    gender: string;
    minAge: number;
    maxAge: number;
  };
  currency: {
    id: number;
    name: string;
    symbol: string;
  };
}
