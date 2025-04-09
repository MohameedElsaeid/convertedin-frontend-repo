import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  GuideBannerComponent,
  HeaderComponent,
} from '@converted-pay/shared/components';
import { RouterOutlet } from '@angular/router';
import {
  provideAuthApi,
  provideSocialAccountsApi,
} from '@converted-pay/shared/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-accounts',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    TranslateModule,
    RouterOutlet,
    GuideBannerComponent,
  ],
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  providers: [provideSocialAccountsApi(), provideAuthApi()],
})
export class AccountsComponent {
  @HostBinding('class') class = 'flex flex-grow-1 flex-column';
}
