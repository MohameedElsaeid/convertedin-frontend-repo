import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItem } from '../../../api/models/interfaces/notification-item.interface';
import { NotificationAlertType } from '../../../api/models/enums';

@Component({
  selector: 'convertedin-notifications-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications-card.component.html',
  styleUrls: ['./notifications-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationsCardComponent {
  @HostBinding('class') class = 'flex notifications__card cursor-pointer';
  @Input({ required: true }) notificationItem!: NotificationItem;
  @Output() cardClicked: EventEmitter<string> = new EventEmitter();
  @HostListener('click', ['$event.target']) onClick(event: any) {
    this.cardClicked.emit(this.notificationItem.notification_id);
  }

  get unread() {
    return !this.notificationItem.read_at;
  }

  getNotificationStatusIcon(): string {
    let icon = '';

    switch (this.notificationItem.alert_type) {
      case NotificationAlertType.DANGER:
        icon = 'pi-exclamation-circle card__error';
        break;

      case NotificationAlertType.INFO:
        icon = 'pi-question-circle card__info';
        break;

      case NotificationAlertType.SUCCESS:
        icon = 'pi-check-circle card__success';
        break;

      case NotificationAlertType.WARNING:
        icon = 'pi-exclamation-circle card__warning';
        break;
    }

    return icon;
  }
}
