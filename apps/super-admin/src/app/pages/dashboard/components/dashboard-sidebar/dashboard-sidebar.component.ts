import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'apps/super-admin/src/environment/environment';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthApi } from '@super-admin/shared/api/auth/base/auth.base';
import { ProvideAuthApi } from '@super-admin/shared/api/auth';
import { LocalStorageConstants } from '@super-admin/shared/constants';

@Component({
  selector: 'convertedin-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrls: ['./dashboard-sidebar.component.scss'],
  providers: [ProvideAuthApi()],
})
export class DashboardSidebarComponent {
  routeList = [
    {
      label: 'Home',
      icon: 'assets/icons/sidebar/home-line.svg',
      link: environment.remoteUrl + '/admins/home',
      isRoute: false,
    },
    {
      label: 'Email Templates',
      icon: 'assets/icons/sidebar/mail.svg',
      link: '/dashboard/email-templates/list',
      isRoute: true,
    },
  ];

  constructor(private authApi: AuthApi, private router: Router) {}

  logout() {
    this.authApi.logout().subscribe(() => {
      localStorage.removeItem(LocalStorageConstants.TOKEN);
      this.router.navigate(['/auth/login']);
    });
  }
}
