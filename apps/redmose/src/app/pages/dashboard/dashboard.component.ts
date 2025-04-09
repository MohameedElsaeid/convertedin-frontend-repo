import { Component, HostBinding, OnInit } from '@angular/core';
import {
  DashboardSidebarComponent,
  RoutesConfig,
  SideNavItemBase,
} from '@convertedin/feature';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'apps/redmose/src/environment/environment';
import { AuthApi, UserData, provideAuthApi } from '@redmose/shared/api';
import { take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppActions } from '@redmose/store/app';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { provideMixpanelTracking } from '../../core/services';
import { TrackingService } from '@redmose/shared/base/tracking.base';

@Component({
  selector: 'convertedin-dashboard-layout',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, DashboardSidebarComponent],
  providers: [provideAuthApi(), provideMixpanelTracking()],
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') class = 'max-h-screen flex';
  sidebarValidators: {
    isTest: boolean;
    missingEmailConfig: boolean;
    adSpendLimitReached: boolean;
    missingPushConfig: boolean;
    missingSmsConfig: boolean;
  } = {} as {
    isTest: boolean;
    missingEmailConfig: boolean;
    adSpendLimitReached: boolean;
    missingPushConfig: boolean;
    missingSmsConfig: boolean;
  };

  // routeConfig: RoutesConfig = {
  //   baseUrl: environment.remoteUrl,
  //   logo: 'app-assets/images/menu-logo.svg',
  //   routes: menuItems,
  //   moreMenuRoutes: moreMenuItems,
  // };

  constructor(
    private ngxService: NgxUiLoaderService,
    private __authApi: AuthApi,
    private __store: Store,
    private __tracking: TrackingService,
  ) {
    // console.log(this.ngxService.hasRunningTask(false, 'default-loader'));
    // this.ngxService.startLoader('default-loader');
  }

  ngOnInit(): void {
    this.__authApi
      .userData()
      .pipe(take(1))
      .subscribe(({ data }) => {
        if (!data.user.activated || data.user.is_fraud) {
          window.location.href = '/dashboard/home';
          return;
        }
        this.fillUserData(data);
        this.initTrackingService(data);
        this.__store.dispatch(AppActions.setUserData({ userData: data }));
      });
  }

  fillUserData(data: UserData): void {
    this.sidebarValidators.isTest = data.user.test;
    this.sidebarValidators.adSpendLimitReached =
      data.user.ad_spend_limit_exceeded;
    this.sidebarValidators.missingEmailConfig =
      !data.user.isStoreEmailConfigCompleted;

    this.sidebarValidators.missingPushConfig =
      !data.user.isStorePushConfigCompleted;

      this.sidebarValidators.missingSmsConfig =
      !data.user.isStoreSmsConfigCompleted;
  }

  initTrackingService(data: UserData): void {
    this.__tracking.init(
      environment.mixPanelToken,
      data.user.id,
      data.user.name,
      data.user.email
    );
  }

  onRouteClick(event: SideNavItemBase): void {
    if (event.trackingEvent) {
      this.__tracking.trackEvent({
        eventName: event.trackingEvent,
        properties: {
          'current page': window.location.pathname,
        },
      });
    }
  }
}
