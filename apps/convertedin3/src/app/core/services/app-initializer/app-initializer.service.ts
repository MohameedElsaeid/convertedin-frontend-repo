import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { LocalStorageConstants } from '@convertedin3/shared/constants';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'apps/convertedin3/src/app/environment/environment';
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
    private __http: HttpClient
  ) {}

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  init(): void {
    this.getUserData();
    // this.getValidations();
  }

  getUserData(): void {
  }

  getValidations(): void {
  }

  validateApp(): Promise<any> {
    const activeLang =
      localStorage.getItem(LocalStorageConstants.LANGUAGE) || 'en';

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
            // return this.getVendorData();
            return [];
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

  // protected getVendorData(): Observable<{ data: VendorData }> {
  //   return this.__authApi.getVendorData().pipe(
  //     takeUntil(this.__unsubscriber),
  //     tap(({ data }) => {
  //       this.modifyCssVariables(this.hexToRgb(data.primaryColor)!);
  //       this.removeSplash();
  //     })
  //   );
  // }

 


  protected getTokenFromURL(): string | null {
    const search = new URLSearchParams(window.location.search);

    return search.get('token');
  }

  protected removeSplash(): void {
    document.getElementById('loading-panel')?.remove();
    document.getElementById('loading-styles')?.remove();
  }


  protected setActiveLanguage(translationFile: any): void {
    const preferredLang = 'en';
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
      document.documentElement.className = this.__translate.defaultLang === 'ar' ? 'rtl' : 'ltr';
  }

}
