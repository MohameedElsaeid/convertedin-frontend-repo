import { Provider } from '@angular/core';
import { NotificationCenterApi } from './base/notification-center.base';
import { NotificationCenterService } from './services/notification-center.service';

export const provideNotificationCenterApi: () => Provider = () => ({
  provide: NotificationCenterApi,
  useClass: NotificationCenterService,
});
