export interface TrackingData {
  eventName: string;
  properties?: {
    [key: string]: string | number | boolean;
  };
}
