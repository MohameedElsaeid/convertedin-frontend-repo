import { ApiConstants } from '@pinads/shared/constants/api/api.constant';

export class NotificationEndpoints {
  static readonly GET_NOTIFICATIONS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/notifications';

  static readonly MARK_ALL_AS_READ =
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    '/notifications/mark-all-read';

  static readonly MARK_AS_READ = (id: string) =>
    ApiConstants.INITIAL +
    ApiConstants.VERSION(1) +
    '/notifications/' +
    id +
    '/mark-read';
    static readonly GET_NOTIFICATION_COUNT=ApiConstants.INITIAL+ApiConstants.VERSION(1) + '/notifications/count'
}
