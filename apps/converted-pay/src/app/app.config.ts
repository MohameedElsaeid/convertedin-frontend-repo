import {
  APP_INITIALIZER,
  ApplicationConfig,
  ErrorHandler,
  importProvidersFrom,
  isDevMode,
  LOCALE_ID,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideStore } from '@ngrx/store';
import {
  AppInitializerService,
  SentryErrorHandler,
  initializeApp,
} from './core/services';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  provideAnimations,
} from '@angular/platform-browser/animations';
import { QueryModule } from '@convertedin/api';
import { appFeature } from './store';
import { ProvideInterceptors } from './core/interceptors/interceptors.config';
import { provideAuthApi } from './shared/api';
import { MessageService } from 'primeng/api';
import { provideLogApi } from './shared/api/log';
import * as Sentry from '@sentry/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DEFAULT_LANG, LocalStorageConstants } from './shared/constants';
import localeEn from '@angular/common/locales/en';
import localeAr from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      AngularSvgIconModule.forRoot(),
      QueryModule,
      TranslateModule.forRoot(),
    ]),
    //Sentry
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    {
      provide: LOCALE_ID,
      useFactory: () => {
        const lang =
          localStorage.getItem(LocalStorageConstants.LANGUAGE) || DEFAULT_LANG;
        if (lang === 'ar') registerLocaleData(localeAr);
        else registerLocaleData(localeEn);
        return lang;
      },
    },
    MessageService,
    provideAnimations(),
    // Ngrx store
    provideStore({ ...appFeature }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'Converted Pay App NgRx',
      trace: isDevMode(),
    }),
    // Routes
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors(ProvideInterceptors())),
    provideAuthApi(),
    // provide Log service
    provideLogApi(),

    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeApp,
      deps: [AppInitializerService, Sentry.TraceService],
    },
  ],
};
