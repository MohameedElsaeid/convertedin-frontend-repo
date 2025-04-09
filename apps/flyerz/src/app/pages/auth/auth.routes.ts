import { Routes } from '@angular/router';
import { countryLanguageGuard } from '../../core/guards';
import { AuthComponent } from './auth.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      // Empty route
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      // Login route
      {
        path: 'login',
        loadComponent: () =>
          import('./views/login/login.component').then(
            (component) => component.LoginComponent
          ),
        canActivate: [countryLanguageGuard],
      },
      // Register route
      {
        path: 'register',
        loadComponent: () =>
          import('./views/register/register.component').then(
            (component) => component.RegisterComponent
          ),
        canActivate: [countryLanguageGuard],
      },
      // Country & languge route
      {
        path: 'country-language',
        loadComponent: () =>
          import('./views/language-country/language-country.component').then(
            (component) => component.LanguageCountryComponent
          ),
      },
      // OTP route
      {
        path: 'otp',
        loadComponent: () =>
          import('@flyerz/shared/pages/otp/otp.component').then(
            (component) => component.OtpComponent
          ),
        canActivate: [countryLanguageGuard],
      },
      // Forget password route
      {
        path: 'forget-password',
        loadComponent: () =>
          import('./views/forget-password/forget-password.component').then(
            (component) => component.ForgetPasswordComponent
          ),
        canActivate: [countryLanguageGuard],
      },
      // Change password route
      {
        path: 'change-password',
        loadComponent: () =>
          import('./views/change-password/change-password.component').then(
            (component) => component.ChangePasswordComponent
          ),
        canActivate: [countryLanguageGuard],
      },
    ],
  },
];
