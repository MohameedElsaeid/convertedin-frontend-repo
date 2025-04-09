import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthApi } from '@converted-pay/shared/api';
import {
  DEFAULT_LANG,
  LocalStorageConstants,
} from '@converted-pay/shared/constants';
import { AppActions } from '@converted-pay/store/app';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { icons } from 'apps/converted-pay/src/assets/icons/icons';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
import { environment } from 'apps/converted-pay/src/environment/environment';

declare const FB: any;

export const initializeApp = (init: AppInitializerService) => () =>
  init.initialize();

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private SvgIconService: SvgIconRegistryService,
    private authApi: AuthApi,
    private store: Store,
    private http: HttpClient,
    private translate: TranslateService
  ) {}
  initialize() {
    const activeLang =
      localStorage.getItem(LocalStorageConstants.LANGUAGE) ||
      this.getUrlLang() ||
      DEFAULT_LANG;

    const token = localStorage.getItem(LocalStorageConstants.TOKEN);
    if (!token) return this.getTranslationFile(activeLang);
    // this.initFacebook();
    if (environment.enableClarity) {
      this.loadClarityScript();
    }

    this.registerIcons();

    return forkJoin([
      this.authApi.getUserProfile().pipe(
        tap((res) => {
          this.store.dispatch(AppActions.setUserData({ userData: res.data }));
        }),
        catchError((err) => {
          return of(true);
        })
      ),
      this.getTranslationFile(activeLang),
    ]);
  }
  getUrlLang() {
    const languages = ['ar', 'en'];
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');

    if (!urlLang || !languages.includes(urlLang)) return null;

    localStorage.setItem(LocalStorageConstants.LANGUAGE, urlLang);
    
    return urlLang;
  }
  loadClarityScript(): void {
    (function (
      c: Window & { [key: string]: any },
      l: Document,
      a: string,
      r: string,
      i: string
    ) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };

      const t: HTMLScriptElement = l.createElement(r) as HTMLScriptElement;
      t.async = true;
      t.defer = true;
      t.src = 'https://www.clarity.ms/tag/' + i;

      const y: Node = l.getElementsByTagName(r)[0];
      y.parentNode?.insertBefore(t, y);
    })(window, document, 'clarity', 'script', 'otatpt3sg8');
  }

  protected getTranslationFile(lang: string): Observable<any> {
    return this.http.get(`assets/i18n/${lang}.json`).pipe(
      tap((response) => {
        this.setActiveLanguage(lang, response);
        this.registerIcons();
      })
    );
  }
  protected setActiveLanguage(lang: string, translationFile: any): void {
    this.translate.setTranslation(lang, translationFile);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

    document.documentElement.lang = lang;
    document.documentElement.dir =
      this.translate.currentLang === 'ar' ? 'rtl' : 'ltr';
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
  registerIcons() {
    icons.forEach((icon) => {
      this.SvgIconService.loadSvg(icon.url, icon.name);
    });
  }
}
