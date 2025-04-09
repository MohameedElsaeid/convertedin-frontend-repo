import { Provider } from '@angular/core';
import { AdsApi } from './base/ads.base';
import { AdsApiService } from './services/ads.service';

export const provideAdsApi: () => Provider = () => ({
  provide: AdsApi,
  useClass: AdsApiService,
});
