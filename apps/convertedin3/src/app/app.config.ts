import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  provideRouter,
} from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideLottieOptions } from 'ngx-lottie';
import { BrowserModule } from '@angular/platform-browser';
import { QueryModule } from '@convertedin/api';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { initializeApp, AppInitializerService } from './core/services';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { convertedInInterceptors } from './core/interceptors/interceptors';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      BrowserAnimationsModule,
      BrowserModule,
      // Apis
      QueryModule,
      // Translate
      TranslateModule.forRoot({}),
    ]),
    MessageService,
    DialogService,
    // App initalizer
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeApp,
      deps: [AppInitializerService],
    },
    // Lottie icon provide
    provideLottieOptions({
      player: () => import('lottie-web'),
    }),
    provideHttpClient(withInterceptors(convertedInInterceptors)),
    // provideAuthApi(),
    // Ngrx store
    // provideStore({ ...store }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'CONVERTEDIN3 App NgRx',
    }),
    // Routes
    provideRouter(APP_ROUTES),
  ],
};
