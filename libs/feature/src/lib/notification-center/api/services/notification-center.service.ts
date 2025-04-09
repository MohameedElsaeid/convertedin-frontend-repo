import { Injectable } from '@angular/core';
import { NotificationCenterApi } from '../base/notification-center.base';
import { QueryApi } from '@convertedin/api';
import { Observable } from 'rxjs';
import { NotificationCenterEndpoints } from '../constant/notification-center.constant';
import { NotificationList } from '../models/interfaces';

@Injectable()
export class NotificationCenterService extends NotificationCenterApi {
  constructor(private __queryApi: QueryApi) {
    super();
  }

  override markAllAsSeen(): Observable<any> {
    return this.__queryApi.post(
      NotificationCenterEndpoints.MARK_ALL_AS_SEEN,
      {}
    );
  }

  override markItemAsRead(notification_id: string): Observable<any> {
    return this.__queryApi.post(NotificationCenterEndpoints.MARK_ITEM_AS_READ, {
      notification_id,
    });
  }

  override notificationListener(): Observable<{
    notifications_count: number | null;
  }> {
    const eventSource = new EventSource(NotificationCenterEndpoints.SSE);

    return new Observable((observer) => {
      eventSource.addEventListener('notifications_count', (event) => {
        observer.next(JSON.parse(event.data));
      });
    });
  }

  override getNotifications(
    per_page?: number | string,
    page?: number,
    group?: string
  ): Observable<NotificationList> {
    return this.__queryApi.get(NotificationCenterEndpoints.GET_NOTIFICATIONS, {
      params: this.__queryApi.createParams({
        per_page,
        page,
        group,
      }),
    });
  }

  override markAllAsRead(): Observable<any> {
    return this.__queryApi.post(
      NotificationCenterEndpoints.MARK_ALL_AS_READ,
      {}
    );
  }
}
