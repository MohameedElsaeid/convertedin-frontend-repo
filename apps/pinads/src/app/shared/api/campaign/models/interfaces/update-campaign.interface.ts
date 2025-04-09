import { ProximityLocation } from './location.interface';

export interface UpdateCampaignPayload {
  // keywords: string[];
  // headlines: string[];
  // descriptions: string[];
  // proximity:ProximityLocation
  changes: Array<{
    request: string;
    action: 'Add' | 'Remove';
    content: string | ProximityLocation;
  }>;
}
