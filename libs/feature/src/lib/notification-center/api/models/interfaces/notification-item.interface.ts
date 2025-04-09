import {
  NotificationActionMethod,
  NotificationAlertType,
  NotificationChannelType,
  NotificationStatus,
  NotificationType,
} from '../enums';

export interface NotificationItem {
  title: string;
  message: string;
  type: NotificationType;
  alert_type: NotificationAlertType;
  channel: NotificationChannelType;
  redirect_url: null | string;
  actions:
    | {
        title: string;
        action: string;
        method: NotificationActionMethod;
      }[]
    | null;
  action_data: null;
  action_status: NotificationStatus;
  notification_id: string;
  admin_notifier_id: null | string;
  created_at: string;
  read_at: null | string;
  icon_path: string;
  repeated: number;
  is_seen?: boolean;
}
