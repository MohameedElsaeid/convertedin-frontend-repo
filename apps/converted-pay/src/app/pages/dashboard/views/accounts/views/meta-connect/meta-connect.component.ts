import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Router, RouterLink } from '@angular/router';
import { LogApi } from '@converted-pay/shared/api/log/base/log.base';
import { TranslateModule } from '@ngx-translate/core';
declare const FB: any;

@Component({
  selector: 'convertedin-meta-connect',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, RouterLink, TranslateModule],
  templateUrl: './meta-connect.component.html',
  styleUrls: ['./meta-connect.component.scss'],
})
export class MetaConnectComponent {
  private fbPermissions: string[] = [
    'public_profile',
    'email',
    'pages_show_list',
    'pages_read_engagement',
    'catalog_management',
    'instagram_basic',
    'business_management',
    'pages_manage_metadata',
    'ads_management',
  ];
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private logApi: LogApi
  ) {}

  connectFb(): void {
    FB.login(
      (response: any) => {
        if (response?.status === 'connected') {
          const token = response.authResponse.accessToken;
          if (token) this.navigate(token);
          else this.router.navigate(['/dashboard/accounts/connect']);
        } else {
          this.logApi.errorLog('User is not logged into Facebook.').subscribe();
        }
      },
      {
        scope: this.fbPermissions.join(','),
      }
    );
  }
  navigate(token: string) {
    this.ngZone.run(() => {
      this.router.navigate(['/dashboard/accounts/account-callback/2'], {
        queryParams: { code: token },
        replaceUrl: true,
      });
    });
  }
}
