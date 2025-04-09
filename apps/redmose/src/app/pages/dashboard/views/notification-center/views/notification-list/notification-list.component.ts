import { Component, HostBinding } from '@angular/core';
import { NotificationsListComponent } from '@convertedin/feature';

@Component({
  selector: 'convertedin-notification-list',
  standalone: true,
  imports: [NotificationsListComponent],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent {
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
}
