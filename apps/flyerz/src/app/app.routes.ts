import { Route } from '@angular/router';
import { authGuard, loggedInGuard } from './core/guards';
import { canCreateAd } from './core/guards/can-create-ad/can-create-ad.guard';
import { createAdFeature } from './store/create-ad';
import { provideState } from '@ngrx/store';
import { createAiMediaFeature } from './store/create-ai-media';

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // Landing route
  // {
  //   path: '',
  //   loadComponent: () =>
  //     import('./pages/landing/landing.component').then(
  //       (component) => component.LandingComponent
  //     ),
  //   canActivate: [loggedInGuard],
  // },
  // Dashboard route
  {
    path: 'my-dashboard',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.routes').then(
        (routes) => routes.DASHBOARD_ROUTES
      ),
    canActivate: [authGuard],
  },
  // Auth route
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((routes) => routes.AUTH_ROUTES),
    canActivate: [loggedInGuard],
  },
  // Create ad route
  {
    path: 'create-ad',
    loadComponent: () =>
      import('./pages/create-ad/create-ad.component').then(
        (component) => component.CreateAdComponent
      ),
    canActivate: [authGuard, canCreateAd],
    providers: [provideState(createAdFeature)],
  },
  // Create Ai Image route
  {
    path: 'create-ai-image',
    loadComponent: () =>
      import('./pages/create-ai-image/create-ai-image.component').then(
        (component) => component.CreateAiImageComponent
      ),
    canActivate: [authGuard],
    providers: [provideState(createAiMediaFeature)],
  },
  // Create Ai video route
  {
    path: 'create-ai-video',
    loadComponent: () =>
      import('./pages/create-ai-video/create-ai-video.component').then(
        (component) => component.CreateAiVideoComponent
      ),
    canActivate: [authGuard],
    providers: [provideState(createAiMediaFeature)],
  },
];
