import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AuthApi, User } from '@pinads/shared/api/auth';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { AppActions } from '@pinads/store/app';
import { SvgIconRegistryService } from 'angular-svg-icon';
import { iconList } from 'apps/pinads/src/assets/icons/icons';
import { environment } from 'apps/pinads/src/environment/environment';
import { PrimeNGConfig } from 'primeng/api';
import {
  Observable,
  catchError,
  forkJoin,
  of,
  take,
  tap,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private config: PrimeNGConfig,
    private store: Store,
    private authApi: AuthApi,
    private SvgIconService: SvgIconRegistryService
  ) {}
  initialize() {
    this.registerIcons();
    const activeLang =
      localStorage.getItem(LocalStorageConstants.LANGUAGE) || 'ar';
    const token = localStorage.getItem(LocalStorageConstants.TOKEN);

    if (!token) return this.getTranslationFile(activeLang);

    return forkJoin([
      this.authApi.getUser().pipe(
        catchError((err) => {
          return of({ data: {} as User });
        }),
        tap((res) => {
          this.store.dispatch(AppActions.setUserData({ userData: res.data }));
        })
      ),
      this.getTranslationFile(activeLang),
    ]);
  }
  protected getTranslationFile(lang: string): Observable<any> {
    return this.http.get(`assets/i18n/${lang}.json`).pipe(
      tap((response) => {
        this.setActiveLanguage(lang, response);
        this.injectGoogleMapsScript();
        // this.injectChatWidget();
      })
    );
  }
  protected setActiveLanguage(lang: string, translationFile: any): void {
    this.translate.setTranslation(lang, translationFile);
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);

    this.translate
      .get('calendar')
      .pipe(take(1))
      .subscribe((res) => this.config.setTranslation(res));

    document.documentElement.lang = lang;
    document.documentElement.dir =
      this.translate.defaultLang === 'ar' ? 'rtl' : 'ltr';
  }

  injectGoogleMapsScript() {
    const mapId = 'google-maps-script';
    if (document.getElementById(mapId)) return;
    const mapKey = environment.googleMapKey;
    const script = document.createElement('script');
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${mapKey}&language=${this.translate.currentLang}`;
    script.id = mapId;
    document.body.appendChild(script);
  }

  // injectChatWidget() {
  //   const chatId = 'freshchat';
  //   if (document.getElementById(chatId)) return;

  //   const fwScript = document.createElement('script');
  //   fwScript.innerHTML = `window.fwSettings = {
  //     widget_id: 150000004701,
  //     local:'${this.translate.currentLang}'
  //   };
  //   !function(){if("function"!=typeof window.FreshworksWidget){var n=function(){n.q.push(arguments)};n.q=[],window.FreshworksWidget=n}}()`;
  //   document.body.appendChild(fwScript);

  //   const script = document.createElement('script');
  //   script.defer = true;
  //   script.async = true;
  //   script.src = 'https://widget.freshworks.com/widgets/150000004701.js';
  //   script.id = chatId;
  //   document.body.appendChild(script);
  // }
  registerIcons() {
    iconList.forEach((icon) => {
      this.SvgIconService.loadSvg(icon.url, icon.name);
    });
  }
}
