import { AiTemplate } from './ai-template.interface';

export interface AiTemplateDetails {
  template: AiTemplate;
  restOfFreeTrial: number;
  availableFreeTrails: number;
  cost: {
    amount: number;
    currency: {
      id: number;
      name: string;
      symbol: string;
    };
  };
}
