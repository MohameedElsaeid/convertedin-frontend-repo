import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { AppActions, selectUserData } from '@converted-pay/store/app';
import { take } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { WelcomePopupComponent } from './components/welcome-popup/welcome-popup.component';
import { NgIf } from '@angular/common';
import { DashboardMobileHeaderComponent } from './components/dashboard-mobile-header/dashboard-mobile-header.component';
import { AuthApi, UserData } from '@converted-pay/shared/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-dashboard',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    NgIf,
    DashboardMobileHeaderComponent,
    TranslateModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DialogService],
})
export class DashboardComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-grow-1 h-full';
  isShowBanner = true;
  isShowInfoBanner = true;
  constructor(
    private store: Store,
    private dialog: DialogService,
    private authApi: AuthApi,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectUserData)
      .pipe(take(1))
      .subscribe((user) => {
        if (!user?.isProfileCompleted) {
          this.dialog.open(WelcomePopupComponent, { showHeader: false });
        }
        if (user) {
          this.checkAndUpdateFBCampaginData(user);
        }
      });
  }
  checkAndUpdateFBCampaginData(user: UserData) {
    const { fbc, fbp } = this.activeRoute.snapshot.queryParams;
    const isQueryExist = fbc || fbp;
    const isDataUpdated = user.fbcUpdated && user.fbpUpdated;
    if (!isDataUpdated && isQueryExist) {
      const data = { fbc, fbp };
      if (!fbc) delete data.fbc;
      if (!fbp) delete data.fbp;
      this.authApi.updateFBCampaignData(data).subscribe();
    }
  }
}
