import { Routes } from '@angular/router';
import { AccountsComponent } from './accounts.component';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    component: AccountsComponent,
    children: [
      // Empty route
      {
        path: '',
        loadComponent: () =>
          import(
            './views/social-media-accounts/social-media-accounts.component'
          ).then((component) => component.SocialMediaAccountsComponent),
      },
      // Connect facebook route
      {
        path: 'connect-facebook',
        loadComponent: () =>
          import('./views/connect-faceboook/connect-faceboook.component').then(
            (component) => component.ConnectFaceboookComponent
          ),
      },
      // Select page route
      {
        path: 'page-select',
        loadComponent: () =>
          import('./views/pages-list/pages-list.component').then(
            (component) => component.PagesListComponent
          ),
      },
      // Categories route
      {
        path: 'categories',
        loadComponent: () =>
          import('./views/categories/categories.component').then(
            (component) => component.CategoriesComponent
          ),
      },
    ],
  },
];
