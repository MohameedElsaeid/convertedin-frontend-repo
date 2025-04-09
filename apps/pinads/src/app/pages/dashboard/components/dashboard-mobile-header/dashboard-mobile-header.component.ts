import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { LangDropdownComponent } from '@pinads/shared/components';
import { AppActions, appFeature } from '@pinads/store/app';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SidebarModule } from 'primeng/sidebar';
import { routeList } from '../../data';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { AuthApi } from '@pinads/shared/api/auth';
@Component({
  selector: 'convertedin-dashboard-mobile-header',
  standalone: true,
  imports: [
    LangDropdownComponent,
    NgIf,
    NgFor,
    AsyncPipe,
    AngularSvgIconModule,
    SidebarModule,
    RouterLink,
    TranslateModule,
    RouterLinkActive,
    LangDropdownComponent,
  ],
  templateUrl: './dashboard-mobile-header.component.html',
  styleUrls: ['./dashboard-mobile-header.component.scss'],
  providers: [],
})
export class DashboardMobileHeaderComponent {
  readonly routeList = routeList;
  openSidebar = false;
  user$ = this.store.select(appFeature.selectUserData);
  dir = document.documentElement.dir;

  constructor(
    private store: Store,
    private router: Router,
    private authApi: AuthApi
  ) {}

  logout() {
    this.authApi.logout().subscribe(() => {
      localStorage.removeItem(LocalStorageConstants.TOKEN);
      localStorage.removeItem(LocalStorageConstants.USER);
      this.store.dispatch(AppActions.removeUserData());
      this.router.navigate(['/auth/login']);
    });
  }
}
