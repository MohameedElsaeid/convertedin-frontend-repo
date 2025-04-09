import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageConstants } from '@redmose/shared/constants';
import { environment } from 'apps/redmose/src/environment/environment';
import { Observable, firstValueFrom, take, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppInitializerService {
  private readonly __defaultLang: string = 'en';

  constructor(
    private __http: HttpClient,
    private __translate: TranslateService
  ) {}

  loadApp(): Promise<any> {
    this.checkAppVersion();

    const lang =
      localStorage.getItem(LocalStorageConstants.LANGUAGE) ||
      this.__defaultLang;

    return firstValueFrom(this.getTranslationFile(lang));
  }

  private getTranslationFile(lang: string): Observable<any> {
    return this.__http
      .get(`${environment.localizationBaseUrl}/lang/${lang}.json`)
      .pipe(
        take(1),
        tap((response) => {
          this.setActiveLanguage(response);
        })
      );
  }

  private setActiveLanguage(translationFile: any): void {
    const activeLang = localStorage.getItem(LocalStorageConstants.LANGUAGE);

    if (!activeLang) {
      localStorage.setItem(LocalStorageConstants.LANGUAGE, this.__defaultLang);
    }

    this.__translate.setTranslation(
      activeLang || this.__defaultLang,
      translationFile
    );
    this.__translate.setDefaultLang(activeLang || this.__defaultLang);
    this.__translate.currentLang = activeLang || this.__defaultLang;
    document.documentElement.lang = activeLang || this.__defaultLang;
    document.documentElement.dir =
      this.__translate.defaultLang === 'ar' ? 'rtl' : 'ltr';
  }

  protected checkAppVersion(): void {
    const currentVersion = localStorage.getItem(LocalStorageConstants.VERSION);

    if (environment.production && currentVersion !== environment.version) {
      localStorage.clear();
      localStorage.setItem(LocalStorageConstants.VERSION, environment.version);
      window.location.reload();
    }
  }
}
