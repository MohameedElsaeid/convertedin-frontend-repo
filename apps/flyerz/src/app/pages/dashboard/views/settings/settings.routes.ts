import { Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';

export const SETTINGS_ROUTES: Routes = [
  {
    path: '',
    component: SettingsComponent,
    children: [
      // Empty route
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      // Profile route
      {
        path: 'profile',
        loadComponent: () =>
          import('./views/profile/profile.component').then(
            (component) => component.ProfileComponent
          ),
      },
      // Accounts route
      {
        path: 'accounts',
        loadChildren: () =>
          import('./views/accounts/accounts.routes').then(
            (routes) => routes.ACCOUNTS_ROUTES
          ),
      },
      // Change language route
      {
        path: 'change-language',
        loadComponent: () =>
          import('./views/change-language/change-language.component').then(
            (component) => component.ChangeLanguageComponent
          ),
      },
      // OTP route
      {
        path: 'otp',
        loadComponent: () =>
          import('@flyerz/shared/pages/otp/otp.component').then(
            (component) => component.OtpComponent
          ),
        data: {
          changePhone: true,
        },
      },
      // Change password route
      {
        path: 'change-password',
        loadComponent: () =>
          import('./views/change-password/change-password.component').then(
            (component) => component.ChangePasswordComponent
          ),
      },
    ],
  },
];
