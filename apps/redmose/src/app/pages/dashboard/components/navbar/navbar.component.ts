import { Component, HostBinding, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ChangeDetectionStrategy } from '@angular/core';
import { AuthApi, LanguageMenu, UserMenu } from '@redmose/shared/api';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectNavbar } from '@redmose/store/app';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { TrimPipe } from '@redmose/shared/pipes';
import { NotificationCenterComponent } from '@convertedin/feature';
import { LocalStorageConstants, languages } from '@redmose/shared/constants';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TrackingData } from '@redmose/shared/models/interfaces';
import { TrackingService } from '@redmose/shared/base/tracking.base';

@Component({
  selector: 'convertedin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MenuModule,
    TrimPipe,
    NotificationCenterComponent,
    TranslateModule,
  ],
})
export class NavbarComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex justify-content-end align-items-center w-full';
  userData$!: Observable<{
    user: UserMenu;
    languages: LanguageMenu;
  }>;
  get activeLang() {
    return languages[this.__translate.currentLang].label;
  }
  profileMenuItems: MenuItem[] = [
    {
      label: 'Logout',
      // icon: 'pi pi-sign-out',
      command: () => {
        this.__authApi.logout().subscribe(() => {
          window.location.reload();
        });
      },
    },
  ];

  languageMenuItems: MenuItem[] = [
    {
      label: languages['en'].label,
      command: () => {
        this.changeLang(languages['en'].key);
      },
      styleClass:
        this.__translate.currentLang === languages['en'].key ? 'hidden' : '',
    },
    {
      label: languages['pt'].label,
      command: () => {
        this.changeLang(languages['pt'].key);
      },
      styleClass:
        this.__translate.currentLang === languages['pt'].key ? 'hidden' : '',
    },
    {
      label: languages['ar'].label,
      command: () => {
        this.changeLang(languages['ar'].key);
      },
      styleClass:
        this.__translate.currentLang === languages['ar'].key ? 'hidden' : '',
    },
  ];
  //#endregion

  constructor(
    private __authApi: AuthApi,
    private __store: Store,
    private __translate: TranslateService,
    private __tracking: TrackingService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  //#region Methods
  changeLang(newLang: string): void {
    localStorage.setItem(LocalStorageConstants.LANGUAGE, newLang);
    window.location.reload();
  }

  getRouteLabel(): string {
    return window.location.pathname.includes('flow-builder')
      ? 'Automation'
      : 'Overview';
  }

  billingClicked(): void{    
    this.__tracking.trackEvent({
      eventName: 'billing and pricing opened',
      properties: {
        'billing and pricing': 'opened',
      },
    });
  }


  getUserData(): void {
    this.userData$ = this.__store.select(selectNavbar).pipe(
      tap((data) => {
        if (data) {
          const menuItems: MenuItem[] = data?.user.submenu
            .filter((item) => !item.label.includes('log'))
            .map((item) =>{
              if(item.label === "Billing & Pricing"){
                return {
                  label : item.label,
                  command: () =>{
                    this.billingClicked();
                    window.open(item.url, '_self');
                  },
                };
              }
              return{
                label: item.label,
                url: item.url,
                target: '_self',
              }
            });
          this.profileMenuItems.unshift(...menuItems);
        }
      })
    );
  }
  //#endregion
}
