import { TrackingData } from '../models/interfaces';

export abstract class TrackingService {
  abstract init(
    token: string,
    userId: number,
    userName: string,
    email: string
  ): void;

  abstract trackEvent(trackingData: TrackingData): void;
}
