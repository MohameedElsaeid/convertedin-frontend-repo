import { createFeature } from '@ngrx/store';
import { campaignReducer } from '../reducer/campaign.reducer';

export const campaignFeature = createFeature({
  name: 'Campaign',
  reducer: campaignReducer,
  
});