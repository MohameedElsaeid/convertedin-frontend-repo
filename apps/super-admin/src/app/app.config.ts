import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { QueryModule } from '@convertedin/api';
import { HeadersInterceptor } from './core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom([
      QueryModule,
    ]),
    MessageService,
    DialogService,
    provideAnimations(),
    provideHttpClient(withInterceptors([HeadersInterceptor])),
    // Routes
    provideRouter(APP_ROUTES),
  ],
};
