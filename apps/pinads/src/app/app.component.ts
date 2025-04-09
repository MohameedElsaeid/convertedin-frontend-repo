import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { WebSocketService } from './core/services';
import { Store } from '@ngrx/store';
import { AppActions, appFeature } from './store/app';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { NotificationPusher } from './shared/api/notification';
import { User } from './shared/api/auth';
import { NotificationIconPipe } from './shared/pipes/notification-icon.pipe';

@Component({
  selector: 'convertedin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, ToastModule, NotificationIconPipe],
  standalone: true,
})
export class AppComponent implements OnInit {
  get dir() {
    return document.documentElement.dir;
  }

  constructor(
    private webSocketService: WebSocketService,
    private store: Store,
    private toastService: MessageService,
    private translate: TranslateService
  ) {}
  ngOnInit(): void {
    this.removeSplash();
    this.subscribeUser();
  }
  subscribeUser() {
    this.store.select(appFeature.selectUserData).subscribe((user) => {
      this.notificationListenerChange(user);
    });
  }

  notificationListenerChange(user: User | null) {
    if (user?.id && user?.email_verified) {
      this.webSocketService.channelListener(
        user!.id.toString(),
        (data: NotificationPusher) => {
          const { title, content } =
            this.translate.currentLang === 'en'
              ? { title: data.en_title, content: data.en_content }
              : { title: data.ar_title, content: data.ar_content };
          this.toastService.add({
            data: { ...data, title, content },
            key: 'notification',
          });
          this.store.dispatch(AppActions.addNotification());
        }
      );
    } else {
      this.webSocketService.removeAllChannelsListener();
    }
  }
  removeSplash(): void {
    document.getElementById('loading-panel')?.remove();
    document.getElementById('loading-styles')?.remove();
  }
}
