import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { providePeopleApi } from '@redmose/shared/api';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'convertedin-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  standalone: true,
  providers: [providePeopleApi()],
  imports: [RouterOutlet, TabMenuModule],
})
export class PeopleComponent {
  @HostBinding('class') class = 'flex-grow-1 flex flex-column';
  tabItems: MenuItem[] = [
    {
      url: '/dashboard/customers/overview',
      target: '_self',
      label: this.__translate.instant('common.Overview'),
    },
    {
      routerLink: '/dashboards/people/all-customers',
      label: this.__translate.instant('All Customers'),
    },
    // {
    //   routerLink: '/dashboards/people/segments',
    //   label: 'Segments',
    // },
    {
      url: '/dashboard/segments?type=featured',
      target: '_self',
      label: this.__translate.instant('Segments'),
    },
    {
      url: '/dashboard/audiences',
      target: '_self',
      label: this.__translate.instant('Audiences'),
    },
  ];

  constructor(private __translate: TranslateService) {}
}
