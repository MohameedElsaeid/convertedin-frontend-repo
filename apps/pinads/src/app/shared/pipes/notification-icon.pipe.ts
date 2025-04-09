import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notificationIcon',
  standalone: true,
})
export class NotificationIconPipe implements PipeTransform {
  notificationsIcon: { [key: string]: string } = {
    rejected: 'assets/images/notification/rejected.png',
    pending: 'assets/images/notification/pending.png',
    completed: 'assets/images/notification/completed.png',
    default: 'assets/images/notification/completed.png',
  };
  transform(value: string): string {
    return this.notificationsIcon[value];
  }
}
