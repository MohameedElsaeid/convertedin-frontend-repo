import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { provideLottieOptions } from 'ngx-lottie';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { initializeApp, AppInitializerService } from './core/services';
import { provideAuthApi } from './shared/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QueryModule } from '@convertedin/api';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';
import { store } from './store/store';
import { flyerzInterceptors } from './core/interceptors/interceptors';

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
    provideHttpClient(withInterceptors(flyerzInterceptors)),
    provideAuthApi(),
    // Ngrx store
    provideStore({ ...store }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      name: 'Flyerz App NgRx',
    }),
    // Routes
    provideRouter(APP_ROUTES),
  ],
};
