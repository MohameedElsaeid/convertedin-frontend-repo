import { createApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { createCustomElement } from '@angular/elements';
import { DashboardSidebarComponent } from 'libs/feature/src/lib/dashboard-sidebar/index';

// bootstrapApplication(AppComponent, appConfig).catch((err) =>
//   console.error(err)
// );

(async () => {
  const app = await createApplication(appConfig);

  const sidebarWidget = createCustomElement(DashboardSidebarComponent, {
    injector: app.injector,
  });

  customElements.define('convertedin-sidebar', sidebarWidget);
})();
