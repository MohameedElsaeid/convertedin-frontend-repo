import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationCenterRoutingModule } from './notification-center-routing.module';
import { NotificationCenterComponent } from './notification-center.component';

@NgModule({
  declarations: [NotificationCenterComponent],
  imports: [CommonModule, NotificationCenterRoutingModule],
})
export class NotificationCenterModule {}
