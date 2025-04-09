import { Injectable } from '@angular/core';
import { NotificationApi } from '../base';
import { ApiResponse, MetaPayload } from '@pinads/shared/models';
import { Observable } from 'rxjs';
import { MarkAsReadResponse, NotificationResponse } from '../models';
import { QueryApi } from '@convertedin/api';
import { NotificationEndpoints } from '../constants/notification.constants';

@Injectable()
export class NotificationApiService implements NotificationApi {
  constructor(private __queryApi: QueryApi) {}

  getNotifications(
    metaPayload: MetaPayload
  ): Observable<ApiResponse<NotificationResponse>> {
    return this.__queryApi.get(NotificationEndpoints.GET_NOTIFICATIONS, {
      params: { ...metaPayload },
    });
  }
  markAllAsRead(): Observable<ApiResponse<MarkAsReadResponse>> {
    return this.__queryApi.post(NotificationEndpoints.MARK_ALL_AS_READ, {});
  }
  markAsRead(id: string): Observable<ApiResponse<MarkAsReadResponse>> {
    return this.__queryApi.post(NotificationEndpoints.MARK_AS_READ(id), {});
  }
   getNotificationCount(): Observable<ApiResponse<MarkAsReadResponse>> {
    return this.__queryApi.get(NotificationEndpoints.GET_NOTIFICATION_COUNT);
  }
}
