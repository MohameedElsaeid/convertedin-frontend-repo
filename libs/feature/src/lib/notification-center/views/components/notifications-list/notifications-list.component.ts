import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Inject,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { NotificationCenterApi } from '../../../api';
import { Observable, finalize, take, tap } from 'rxjs';
import { NotificationList } from '../../../api/models/interfaces';
import {
  GENERAL_PAGINATION,
  REQUIRED_ACTION_PAGINATION,
  notificationListImports,
  notificationListProviders,
} from './imports-providers';
import { PaginationService } from '../../../services/pagination.service';
import { NotificationItem } from '../../../api/models/interfaces/notification-item.interface';

@Component({
  selector: 'convertedin-notifications-list',
  standalone: true,
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  imports: notificationListImports,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: notificationListProviders,
})
export class NotificationsListComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
  @Input() showViewMoreBtn: boolean = true;
  @Input() listMode!: 'paginated' | 'list';
  @Input() assetsUrl: string = '';

  notifications$!: Observable<NotificationList>;
  markAsSeen$!: Observable<any>;
  actionNotifications$!: Observable<NotificationList>;
  loaders: { list: boolean; markAsRead: boolean } = {
    list: true,
    markAsRead: false,
  };

  get data() {
    return this._generalPagination.data;
  }
  get actionData() {
    return this._actionPagination.data;
  }
  //#endregion

  constructor(
    private __notificationApi: NotificationCenterApi,
    private __changeDetection: ChangeDetectorRef,
    @Inject(GENERAL_PAGINATION) protected _generalPagination: PaginationService,
    @Inject(REQUIRED_ACTION_PAGINATION)
    protected _actionPagination: PaginationService
  ) {}

  ngOnInit(): void {
    this.getNotificationsList();
    this.getActionNotifications();
    this.markAllAsSeen();
  }

  //#region Methods
  markAllAsRead(): void {
    this.loaders.markAsRead = true;
    this.__notificationApi
      .markAllAsRead()
      .pipe(
        finalize(() => {
          this.loaders.markAsRead = false;
        }),
        take(1)
      )
      .subscribe(() => {
        this.resetPagination();
        this.getNotificationsList();
        this.__changeDetection.detectChanges();
      });
  }

  getNotificationsList(): void {
    if (!this._generalPagination.reachedTotal) {
      this._generalPagination.currentPage++;
      this.notifications$ = this.__notificationApi
        .getNotifications(
          this._generalPagination.perPage,
          this._generalPagination.currentPage
        )
        .pipe(
          finalize(() => {
            this.loaders.list = false;
          }),
          tap((data) => {
            this._generalPagination.processData(data);
          })
        );
    }
  }

  markAllAsSeen(): void {
    this.markAsSeen$ = this.__notificationApi.markAllAsSeen();
  }

  getActionNotifications(): void {
    if (!this._actionPagination.reachedTotal) {
      this._actionPagination.currentPage++;
      this.actionNotifications$ = this.__notificationApi
        .getNotifications(
          this._actionPagination.perPage,
          this._actionPagination.currentPage,
          'actionable'
        )
        .pipe(
          tap((data) => {
            this._actionPagination.processData(data, true);
          })
        );
    }
  }

  markItemAsRead(id: string, mode: 'general' | 'action'): void {
    this.__notificationApi
      .markItemAsRead(id)
      .pipe(take(1))
      .subscribe(() => {
        const newData = this.updateDataAfterMarkAsRead(id, mode);

        mode === 'general' &&
          (this._generalPagination.data = {
            ...this._generalPagination.data!,
            data: [...newData],
          });

        mode === 'action' &&
          (this._actionPagination.data = {
            ...this._actionPagination.data!,
            data: [...newData],
          });
      });
  }

  updateDataAfterMarkAsRead(
    id: string,
    mode: 'general' | 'action'
  ): NotificationItem[] {
    const updatedData =
      mode === 'general' ? [...this.data!.data] : [...this.actionData!.data];

    const index = updatedData.findIndex((item) => item.notification_id === id);

    updatedData[index] = {
      ...updatedData[index],
      read_at: new Date().toISOString(),
    };

    return updatedData;
  }

  resetPagination(): void {
    this._generalPagination.resetPagination();
    this.loaders.list = true;
  }
  //#endregion
}
