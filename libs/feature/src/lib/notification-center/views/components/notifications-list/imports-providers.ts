import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { NotificationsCardComponent } from '../notifications-card/notifications-card.component';
import { InjectionToken, Provider } from '@angular/core';
import { PaginationService } from '../../../services/pagination.service';
import { provideNotificationCenterApi } from '../../../api';

export const notificationListImports = [
  CommonModule,
  ButtonModule,
  TabViewModule,
  NotificationsCardComponent,
  HttpClientModule,
  InfiniteScrollModule,
];

export const GENERAL_PAGINATION: InjectionToken<any> = new InjectionToken(
  'GeneralPagination'
);

export const REQUIRED_ACTION_PAGINATION: InjectionToken<any> =
  new InjectionToken('RequiredActionPagination');

export const notificationListProviders: Provider[] = [
  {
    provide: GENERAL_PAGINATION,
    useClass: PaginationService,
  },
  {
    provide: REQUIRED_ACTION_PAGINATION,
    useClass: PaginationService,
  },
  provideNotificationCenterApi(),
];
