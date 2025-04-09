import { ApiResponse, MetaPayload } from '@pinads/shared/models';
import { Observable } from 'rxjs';
import { MarkAsReadResponse, NotificationResponse } from '../models';

export abstract class NotificationApi {
  abstract getNotifications(
    metaPayload: MetaPayload
  ): Observable<ApiResponse<NotificationResponse>>;

  abstract markAllAsRead(): Observable<ApiResponse<MarkAsReadResponse>>;

  abstract markAsRead(id: string): Observable<ApiResponse<MarkAsReadResponse>>;
  
  abstract getNotificationCount(): Observable<ApiResponse<MarkAsReadResponse>>;
}
