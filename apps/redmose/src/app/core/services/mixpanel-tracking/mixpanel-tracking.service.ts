import { Injectable } from '@angular/core';
import { TrackingService } from '@redmose/shared/base/tracking.base';
import { TrackingData } from '@redmose/shared/models/interfaces';
import { environment } from 'apps/redmose/src/environment/environment';
import mixpanel from 'mixpanel-browser';

@Injectable()
export class MixPanelTrackingService extends TrackingService {
  constructor() {
    super();
  }

  override init(
    token: string,
    userId: number,
    userName: string,
    email: string
  ): void {
    if (environment.enableTracking) {
      mixpanel.init(token, {
        debug: false,
        track_pageview: true,
        persistence: 'localStorage',
      });

      mixpanel.identify(userId);

      mixpanel.people.set({
        $email: email,
        $name: userName,
      });
    }
  }

  override trackEvent(trackingData: TrackingData): void {
    if (environment.enableTracking)
      mixpanel.track(trackingData.eventName, { ...trackingData.properties });
  }
}
