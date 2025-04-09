import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'convertedin-notification-center',
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.scss'],
})
export class NotificationCenterComponent {
  @HostBinding('class') class = 'flex flex-column flex-grow-1';
}
