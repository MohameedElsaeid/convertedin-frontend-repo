export class NotificationCenterEndpoints {
  // Notifications list endpoint
  static readonly GET_NOTIFICATIONS = '/api/v1/notifications';
  // Mark all notifications as read endpoint
  static readonly MARK_ALL_AS_READ = '/api/v1/notifications/mark-as-read';
  // Mark notification item as read endpoint
  static readonly MARK_ITEM_AS_READ = '/api/v1/notifications/mark-one-as-read';
  // Maek all notification items as seen endpoint
  static readonly MARK_ALL_AS_SEEN = '/api/v1/notifications/mark-all-as-seen';
  // Notifications Server Side Event endpoint
  static readonly SSE = '/api/v1/notifications/sse';
}
