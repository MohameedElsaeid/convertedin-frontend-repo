import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationCenterComponent } from './notification-center.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationCenterComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./views/notification-list/notification-list.component').then(
            (component) => component.NotificationListComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationCenterRoutingModule {}
