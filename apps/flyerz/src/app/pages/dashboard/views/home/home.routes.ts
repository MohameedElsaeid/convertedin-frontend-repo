import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      // Home route
      {
        path: '',
        loadComponent: () =>
          import('./views/home/home.component').then(
            (component) => component.HomeComponent
          ),
      },
      // Details route
      {
        path: 'ad-details/:adId',
        loadComponent: () =>
          import('./views/ad-details/ad-details.component').then(
            (component) => component.AdDetailsComponent
          ),
      },
    ],
  },
];
