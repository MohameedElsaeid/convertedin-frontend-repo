import { Provider } from '@angular/core';
import { CampaignApi } from './base/campaign.base';
import { CampaignService } from './services/campaign.service';

export function provideCampaignService(): Provider {
  return {
    provide: CampaignApi,
    useClass: CampaignService,
  };
}
