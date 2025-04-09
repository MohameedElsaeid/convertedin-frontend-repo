import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { NotificationCenterComponent } from '../../../libs/feature/src/lib/notification-center';

// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );

(async () => {
  const app = await createApplication(appConfig);

  const notificactionsWidget = createCustomElement(
    NotificationCenterComponent,
    {
      injector: app.injector,
    }
  );

  customElements.define(
    'convertedin-notification-center',
    notificactionsWidget
  );
})();
