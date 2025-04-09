import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { AuthApi } from '@flyerz/shared/api';
import { VendorData } from '@flyerz/shared/api/auth/models/interfaces/vendor-data.interface';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { AppActions } from '@flyerz/store/app';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'apps/flyerz/src/environment/environment';
import {
  Observable,
  Subject,
  concatMap,
  firstValueFrom,
  of,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';

declare const fcWidget: any;
declare const FB: any;

export const initializeApp = (init: AppInitializerService) => () =>
  init.validateApp();

@Injectable({ providedIn: 'root' })
export class AppInitializerService implements OnDestroy {
  //#region Declerations
  private __unsubscriber: Subject<void> = new Subject();
  private readonly __demoToken: string =
    '88e5ae524ae587e0cb2fcbe06129c362bd4a5cd619e71c9ee2891f1e48c9d741';
  //#endregion

  constructor(
    private __translate: TranslateService,
    private __authApi: AuthApi,
    private __store: Store,
    private __http: HttpClient
  ) {}

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  init(): void {
    this.checkAppVersion();
    this.initFacebook();
    this.getUserData();
    this.setFacebookToken();
    this.addChat();
    this.getValidations();
  }

  getUserData(): void {
    const token = localStorage.getItem(LocalStorageConstants.TOKEN);
    if (token) {
      this.__authApi
        .getUserData()
        .pipe(takeUntil(this.__unsubscriber))
        .subscribe(({ data }) => {
          this.__store.dispatch(AppActions.setUserData({ user: data }));
        });
    }
  }

  getValidations(): void {
    const token = localStorage.getItem(LocalStorageConstants.TOKEN);
    if (token) {
      this.__authApi
        .getValidations()
        .pipe(takeUntil(this.__unsubscriber))
        .subscribe(({ data }) => {
          this.__store.dispatch(
            AppActions.setValidations({ validations: data })
          );
        });
    }
  }

  validateApp(): Promise<any> {
    const activeLang =
      localStorage.getItem(LocalStorageConstants.LANGUAGE) || 'ar';

    if (environment.production) {
      const partenerToken =
        this.getTokenFromURL() ||
        localStorage.getItem(LocalStorageConstants.PARTENER_TOKEN);

      if (partenerToken) {
        localStorage.setItem(
          LocalStorageConstants.PARTENER_TOKEN,
          partenerToken
        );
      }

      return firstValueFrom(
        this.isInIframe(partenerToken!).pipe(
          concatMap((value) => {
            if (value) {
              throw throwError(() => new Error());
            }
            return this.getTranslationFile(activeLang);
          }),
          concatMap(() => {
            return this.getVendorData();
          })
        )
      );
    } else {
      localStorage.setItem(
        LocalStorageConstants.PARTENER_TOKEN,
        this.__demoToken
      );

      this.removeSplash();

      return firstValueFrom(
        this.getTranslationFile(activeLang).pipe(
          tap(() => {
            this.removeSplash();
          })
        )
      );
    }
  }

  protected isInIframe(partenerToken: string): Observable<boolean> {
    return of(window.self === window.parent || !partenerToken);
  }

  protected getTranslationFile(lang: string): Observable<any> {
    return this.__http.get(`assets/i18n/${lang}.json`).pipe(
      takeUntil(this.__unsubscriber),
      tap((response) => {
        this.setActiveLanguage(response);
      })
    );
  }

  protected getVendorData(): Observable<{ data: VendorData }> {
    return this.__authApi.getVendorData().pipe(
      takeUntil(this.__unsubscriber),
      tap(({ data }) => {
        this.modifyCssVariables(this.hexToRgb(data.primaryColor)!);
        this.removeSplash();
      })
    );
  }

  protected modifyCssVariables(rgb: { r: number; g: number; b: number }): void {
    document.documentElement.style.setProperty(
      '--flyerz-primary-color',
      `rgba(${rgb?.r},${rgb?.g},${rgb?.b})`
    );

    document.documentElement.style.setProperty(
      '--flyerz-primary-100',
      `rgba(${rgb?.r},${rgb?.g},${rgb?.b},0.1)`
    );

    document.documentElement.style.setProperty(
      '--flyerz-primary-50',
      `rgba(${rgb?.r},${rgb?.g},${rgb?.b},0.05)`
    );

    document.documentElement.style.setProperty(
      '--flyerz-primary-25',
      `rgba(${rgb?.r},${rgb?.g},${rgb?.b},0.025)`
    );
  }

  protected hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  protected getTokenFromURL(): string | null {
    const search = new URLSearchParams(window.location.search);

    return search.get('token');
  }

  protected removeSplash(): void {
    document.getElementById('loading-panel')?.remove();
    document.getElementById('loading-styles')?.remove();
  }

  protected setFacebookToken(): void {
    this.__store.dispatch(
      AppActions.setFacebookToken({
        token: localStorage.getItem(LocalStorageConstants.FACEBOOK_TOKEN)!,
      })
    );
  }

  protected setActiveLanguage(translationFile: any): void {
    const preferredLang = 'ar';
    const activeLang = localStorage.getItem(LocalStorageConstants.LANGUAGE);

    if (!activeLang) {
      localStorage.setItem(LocalStorageConstants.LANGUAGE, preferredLang);
    }

    this.__translate.setTranslation(
      activeLang || preferredLang,
      translationFile
    );
    this.__translate.setDefaultLang(activeLang || preferredLang);
    this.__translate.currentLang = activeLang || preferredLang;
    document.documentElement.lang = activeLang || preferredLang;
    document.documentElement.dir =
      this.__translate.defaultLang === 'ar' ? 'rtl' : 'ltr';
  }

  protected initFacebook(): void {
    FB?.init({
      appId: '564089014488477',
      cookie: true,
      xfbml: true,
      version: 'v16.0',
    });
    FB?.AppEvents.logPageView();
  }

  protected addChat(): void {
    const script = document.createElement('script');
    script.defer = true;
    script.src = '//fw-cdn.com/2433354/3016707.js';
    script.id = 'freshchat';
    document.body.appendChild(script);
    this.checkIfChatAdded();
  }

  protected checkIfChatAdded(): void {
    const targetNode = document.body;

    const config = { childList: true, subtree: true };

    const observer = new MutationObserver(
      (mutationsList: any, observer: any) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (document.getElementById('fc_frame')) {
              fcWidget?.user.setLocale(
                localStorage.getItem(LocalStorageConstants.LANGUAGE)
              );
              observer.disconnect();
            }
          }
        }
      }
    );

    observer.observe(targetNode, config);
  }

  protected checkAppVersion(): void {
    const currentVersion = localStorage.getItem(LocalStorageConstants.VERSION);

    if (environment.production && currentVersion !== environment.version) {
      localStorage.clear();
      localStorage.setItem(LocalStorageConstants.VERSION, environment.version);
      window.self.location.reload();
    }
  }
  //#endregion
}
