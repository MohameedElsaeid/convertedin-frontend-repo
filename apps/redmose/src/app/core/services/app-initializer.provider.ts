import { APP_INITIALIZER, Provider } from '@angular/core';
import { AppInitializerService } from './app-initializer.service';

export const provideAppInitializer: () => Provider = () => ({
  provide: APP_INITIALIZER,
  multi: true,
  useFactory: (init: AppInitializerService) => () => init.loadApp(),
  deps: [AppInitializerService],
});
