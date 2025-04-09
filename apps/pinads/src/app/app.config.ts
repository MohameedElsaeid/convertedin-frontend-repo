import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { QueryModule } from '@convertedin/api';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AppInitializerService, IconService } from './core/services';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';
import { ProvideInterceptors } from './core/interceptors/interceptors.config';
import { ProvideAuthService } from './shared/api/auth';
import { appFeature } from './store/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
export const appConfig: ApplicationConfig = {
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: (initService: AppInitializerService) => () =>
          initService.initialize(),
        deps: [AppInitializerService],
        multi: true,
      },
    importProvidersFrom([
      AngularSvgIconModule.forRoot(),
      QueryModule,
      TranslateModule.forRoot(),
    ]),
    provideAnimations(),
    MessageService,
    IconService,
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    ProvideAuthService(),
    provideHttpClient(withInterceptors(ProvideInterceptors())),
    provideState(appFeature),
    provideStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'Pinads App NgRx',
    }),
   
  ],
};
