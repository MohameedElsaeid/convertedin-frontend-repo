import { Provider } from '@angular/core';
import { TrackingService } from '@redmose/shared/base/tracking.base';
import { MixPanelTrackingService } from './mixpanel-tracking.service';

export const provideMixpanelTracking: () => Provider = () => ({
  provide: TrackingService,
  useClass: MixPanelTrackingService,
});
