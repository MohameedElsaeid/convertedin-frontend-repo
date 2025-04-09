import { Routes } from '@angular/router';
import { PeopleComponent } from './people.component';

export const PEOPLE_ROUTES: Routes = [
  {
    path: '',
    component: PeopleComponent,
    children: [
      // Empty route
      {
        path: '',
        redirectTo: 'all-customers',
        pathMatch: 'full',
      },
      // All customers route
      {
        path: 'all-customers',
        loadComponent: () =>
          import(
            './views/people-all-customers/people-all-customers.component'
          ).then((component) => component.PeopleAllCustomersComponent),
      },
      {
        path: 'segments_groups',
        loadChildren: () =>
          import('./views/segments/segments.routes').then(
            (routes) => routes.SEGMENTS_ROUTES
          ),
      },
    ],
  },
];
