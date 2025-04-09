import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import {
  NotificationItem,
  ProvideNotificationService,
} from '@pinads/shared/api/notification';
import { NotificationApi } from '@pinads/shared/api/notification/base';
import {
  BehaviorSubject,
  Observable,
  finalize,
  map,
  scan,
  switchMap,
  tap,
} from 'rxjs';
import { NotificationCardComponent } from './components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppActions, appFeature } from '@pinads/store/app';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { MetaPayload } from '@pinads/shared/models';

@Component({
  selector: 'convertedin-notification',
  standalone: true,
  imports: [
    OverlayPanelModule,
    BadgeModule,
    AsyncPipe,
    NgIf,
    NgFor,
    NotificationCardComponent,
    TranslateModule,
    InfiniteScrollModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  providers: [ProvideNotificationService()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnInit {
  @ViewChild(OverlayPanel) set _panel(panel: OverlayPanel) {
    this.panel = panel;
  }
  panel!: OverlayPanel;
  notificationList$!: Observable<NotificationItem[]>;
  notificationCount$ = this.store.select(appFeature.selectNotificationCount);
  metaPayload$ = new BehaviorSubject<MetaPayload>({
    page: 1,
    per_page: 10,
  });
  pages_number = 1;
  loading$ = new BehaviorSubject(false);
  markAllLoading$ = new BehaviorSubject(false);

  constructor(
    private notificationApi: NotificationApi,
    private destroyRef: DestroyRef,
    private store: Store,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getNotificationNumber();
    this.getNotificationList();
  }
  getNotificationNumber() {
    this.notificationApi
      .getNotificationCount()
      .subscribe((res) => {
        this.store.dispatch(
          AppActions.setNotificationCount({
            notificationCount: res.data.unread_count,
          })
        );
      });
  }
  getNotificationList() {
    this.loading$.next(true);
    this.notificationList$ = this.metaPayload$.pipe(
      switchMap((metaPayload) => {
        return this.notificationApi.getNotifications(metaPayload).pipe(
          takeUntilDestroyed(this.destroyRef),
          tap((res) => {
            this.store.dispatch(
              AppActions.setNotificationCount({
                notificationCount: res.data.unread_count,
              })
            );
            this.pages_number = res.data.pages_number;
          }),
          map((res) => res.data.notifications),

          finalize(() => {
            this.loading$.next(false);
          })
        );
      }),
      scan((prev, curr) => [...prev, ...curr])
    );
  }
  openPanel(e: any) {
    this.panel.toggle(e);
    if (this.panel.overlayVisible)
      this.metaPayload$.next({
        page: 1,
        per_page: 10,
      });
  }
  markAllAsRead() {
    this.panel.hide();
    this.notificationApi.markAllAsRead().subscribe((res) => {
      this.store.dispatch(
        AppActions.setNotificationCount({
          notificationCount: 0,
        })
      );
    });
  }
  onClickNotification(notification: NotificationItem) {
    this.panel.hide();
    // /dashboard/campaign-details/67
    this.router.navigate([
      'dashboard/campaign-details',
      notification.data.campaign_id,
    ]);
    if (!notification.read_at) this.markAsRead(notification.id);
  }
  markAsRead(id: string) {
    this.notificationApi.markAsRead(id).subscribe((res) => {
      this.store.dispatch(
        AppActions.setNotificationCount({
          notificationCount: res.data.unread_count,
        })
      );
    });
  }
  onScroll() {
    const metaPayload = this.metaPayload$.value;
    if (metaPayload.page != this.pages_number) {
      metaPayload.page++;
      this.metaPayload$.next(metaPayload);
    }
  }
}
