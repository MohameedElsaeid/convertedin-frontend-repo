import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SidebarModule } from 'primeng/sidebar';
import { routeList } from '../../data';
import { LocalStorageConstants } from '@converted-pay/shared/constants';
import { selectUserData } from '@converted-pay/store/app';
@Component({
  selector: 'convertedin-dashboard-mobile-header',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    AngularSvgIconModule,
    SidebarModule,
    RouterLink,
    TranslateModule,
    RouterLinkActive,
  ],
  templateUrl: './dashboard-mobile-header.component.html',
  styleUrls: ['./dashboard-mobile-header.component.scss'],
})
export class DashboardMobileHeaderComponent {
  readonly routeList = routeList;
  openSidebar = false;
  userData$ = this.store.select(selectUserData);
  dir = document.documentElement.dir;
  
  constructor(private store: Store,private router:Router) {}

  logout() {
    localStorage.removeItem(LocalStorageConstants.TOKEN);
    this.router.navigate(['/auth/login']);
  }

}
