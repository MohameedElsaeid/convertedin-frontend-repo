import { GeneralAction } from './general-action';

export interface NotificationAction extends GeneralAction {
  name: string;
  body: string;
  preview_body?: string;
  meta?: {
    notification_title?: string;
    notification_url?: string;
  };
}
