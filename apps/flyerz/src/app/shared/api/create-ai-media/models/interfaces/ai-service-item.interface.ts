import { AiServiceStatus } from '../enums';

export interface AiServiceItem {
  id: number;
  name: string;
  url: string;
  status: {
    id: AiServiceStatus;
    name: string;
  };
  created_at: string;
}
