import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NotificationsListComponent } from './components/notifications-list/notifications-list.component';
import { PrimeNGShadowDOMDirective } from 'primeng-shadowdom-directives';
import { BadgeModule } from 'primeng/badge';
import { NotificationCenterApi, provideNotificationCenterApi } from '../api';
import { Observable, map } from 'rxjs';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'convertedin-notification-center',
  standalone: true,
  imports: [
    ButtonModule,
    OverlayPanelModule,
    NotificationsListComponent,
    PrimeNGShadowDOMDirective,
    BadgeModule,
    AsyncPipe,
    NgIf,
    NgTemplateOutlet,
  ],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [provideNotificationCenterApi()],
})
export class NotificationCenterComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex justify-content-center align-items-center';
  @Input() injectStylesToParent: boolean = false;
  @Input() showViewMoreBtn: boolean = true;
  @Input() assetsUrl: string = '';
  notificationsCount$!: Observable<{ notifications_count: string }>;
  //#endregion

  constructor(private __notificationApi: NotificationCenterApi) {}

  ngOnInit(): void {
    this.addStylesToParent();
    this.injectStylesToParent && this.addExtraStylesToParent();
    this.notificationsCount$ = this.__notificationApi
      .notificationListener()
      .pipe(
        map((data) => ({
          notifications_count: data.notifications_count
            ? data.notifications_count.toFixed()
            : '',
        }))
      );
  }

  //#region Methods
  addStylesToParent(): void {
    const style = document.createElement('style');
    style.innerHTML = `.convertedin__notification-overlay {top: 70px !important;border-radius: 12px !important;background: #fff !important;box-shadow: 0px 1px 4px 0px rgba(50, 56, 58, 0.08) !important;min-height: 80vh;max-height: 788px;width: 440px;}
.convertedin__notification-overlay::after, .convertedin__notification-overlay::before {display: none;}
.convertedin__notification-overlay,.convertedin__notification-overlay .p-overlaypanel-content {display: flex;flex-direction: column;}
.convertedin__notification-overlay .p-overlaypanel-content {flex-grow: 1;padding: 0 !important;}`;
    document.head.appendChild(style);
  }

  addExtraStylesToParent(): void {
    const style = document.createElement('style');
    style.innerHTML = `.flex{ display: flex;}.flex-column{flex-direction: column;}.justify-content-center{justify-content: center;}.align-items-center{align-items:center}.flex-grow-1{flex-grow:1}`;
    document.head.appendChild(style);
  }
  //#endregion
}
