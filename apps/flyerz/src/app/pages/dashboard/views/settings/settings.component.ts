import { Component, HostBinding } from '@angular/core';
import { provideAccountsApi } from '@flyerz/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'convertedin-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [TabMenuModule, TranslateModule],
  providers: [provideAccountsApi()],
})
export class SettingsComponent {
  @HostBinding('class') class = 'flex flex-column flex-grow-1 gap-5';

  activeTab!: MenuItem;
  items: MenuItem[] = [
    // Profile
    {
      label: 'dashboard.settings.tabs.profile',
      icon: 'assets/icons/dashboard/settings/user.svg',
      routerLink: '/my-dashboard/settings/profile',
    },
    // Language
    {
      label: 'dashboard.settings.tabs.lang',
      icon: 'assets/icons/dashboard/settings/global.svg',
      routerLink: '/my-dashboard/settings/change-language',
    },
    // FAQ
    // {
    //   label: 'dashboard.settings.tabs.faq',
    //   icon: 'assets/icons/dashboard/settings/message-question-checkmark.svg',
    //   routerLink: '/my-dashboard/settings/faq',
    // },
    // Earn money
    // {
    //   label: 'dashboard.settings.tabs.wallet',
    //   icon: 'assets/icons/dashboard/settings/wallet.svg',
    //   routerLink: '/my-dashboard/settings/earn-money',
    // },
    // Accounts
    {
      label: 'dashboard.settings.tabs.accounts',
      icon: 'assets/icons/dashboard/settings/note-2.svg',
      routerLink: '/my-dashboard/settings/accounts',
    },
  ];
}
