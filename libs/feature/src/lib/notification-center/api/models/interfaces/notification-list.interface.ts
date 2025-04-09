import { NotificationItem } from './notification-item.interface';

export interface NotificationList {
  data: NotificationItem[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: null | string;
      label: string;
      active: boolean;
    }[];

    path: string;
    per_page: string;
    to: number;
    total: number;
    requiredActionsCount: number;
  };
}
