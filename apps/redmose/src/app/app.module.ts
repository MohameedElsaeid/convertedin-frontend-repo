import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { QueryModule } from '@convertedin/api';
import { ToastModule } from 'primeng/toast';
import { InterceptorsModule } from './core/interceptors/interceptors.module';
import { MessageService } from 'primeng/api';
import { store } from './store/store';
import { provideAppInitializer } from './core/services/app-initializer.provider';
import { TranslateModule } from '@ngx-translate/core';
import { CodeEditorModule } from '@ngstack/code-editor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    QueryModule,
    BrowserAnimationsModule,
    ToastModule,
    TranslateModule.forRoot({}),
    InterceptorsModule,
    // Routes
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    // Ngrx store
    StoreModule.forRoot({ ...store }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    CodeEditorModule.forRoot(),
    NgxUiLoaderModule.forRoot({
      bgsColor: '#ffffff',
      bgsOpacity: 0.5,
      bgsPosition: 'bottom-right',
      bgsSize: 60,
      bgsType: 'ball-scale-multiple',
      blur: 0,
      delay: 0,
      fastFadeOut: true,
      fgsColor: '#0044dd',
      fgsPosition: 'center-center',
      fgsSize: 60,
      fgsType: 'ball-scale-multiple',
      gap: 24,
      masterLoaderId: 'master',
      overlayBorderRadius: '0',
      overlayColor: 'rgb(254,254,254,1)',
      pbColor: '#0044dd',
      pbDirection: 'ltr',
      pbThickness: 3,
      hasProgressBar: true,
      text: 'Loading... please wait',
      textColor: '#000000',
      textPosition: 'center-center',
      maxTime: -1,
      minTime: 300,
    }),
  ],
  providers: [MessageService, provideAppInitializer()],
  bootstrap: [AppComponent],
})
export class AppModule {}
