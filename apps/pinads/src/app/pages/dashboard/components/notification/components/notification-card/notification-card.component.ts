import { Component, Input, OnInit } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { NotificationItem } from '@pinads/shared/api/notification';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NotificationIconPipe } from '@pinads/shared/pipes/notification-icon.pipe';

@Component({
  selector: 'convertedin-notification-card',
  standalone: true,
  imports: [NgIf, DatePipe, AngularSvgIconModule, NotificationIconPipe],
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.scss'],
  host: {
    class: 'flex notifications__card cursor-pointer',
  },
})
export class NotificationCardComponent {
  @Input({ required: true }) notificationItem!: NotificationItem;
  
  get unread() {
    return !this.notificationItem.read_at;
  }
}
