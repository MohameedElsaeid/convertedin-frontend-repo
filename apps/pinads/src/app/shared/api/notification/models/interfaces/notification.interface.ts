export interface NotificationItem {
  id: string;
  user_id: number;
  data: {
    content: string;
    audit_id: number;
    campaign_id: number;
    status: string;
    icon:string;
    title: string;
  };
  read_at: string;
  created_at: string;
}
export interface NotificationResponse {
  current_page: number;
  pages_number: number;
  unread_count: number;
  notifications: NotificationItem[];
}

export interface MarkAsReadResponse {
  unread_count: number;
}

export interface NotificationPusher {
  ar_content: string;
  ar_title: string;
  title?: string;
  content?: string;
  audit_id: number;
  campaign_id: number;
  en_content: string;
  en_title: string;
  id: string;
  status: string;
  type: string;
}
