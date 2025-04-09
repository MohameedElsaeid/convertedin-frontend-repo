import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, ROUTER_CONFIGURATION, withInMemoryScrolling } from '@angular/router';
import { appRoutes } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes
      ,withInMemoryScrolling({anchorScrolling: "enabled",
        scrollPositionRestoration: 'enabled',})),
    importProvidersFrom([BrowserAnimationsModule, BrowserModule])],
};