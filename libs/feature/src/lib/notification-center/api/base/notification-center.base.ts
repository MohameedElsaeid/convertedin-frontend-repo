import { Observable } from 'rxjs';
import { NotificationList } from '../models/interfaces';

export abstract class NotificationCenterApi {
  /**
   * Gets notifications list
   * @param per_page Number of items per call
   * @param page Current start index of items
   * @param group Notifications category
   */
  abstract getNotifications(
    per_page?: number | string,
    page?: number,
    group?: string
  ): Observable<NotificationList>;

  /**
   * Marks all notifications as read
   */
  abstract markAllAsRead(): Observable<any>;

  /**
   * Event source that gets unseen notifications in runtime
   */
  abstract notificationListener(): Observable<{
    notifications_count: number | null;
  }>;

  /**
   * Marks single notification item as read
   * @param notification_id Id of notification item to be marked as read
   */
  abstract markItemAsRead(notification_id: string): Observable<any>;

  /**
   * Marks all notifications as seen
   */
  abstract markAllAsSeen(): Observable<any>;
}
