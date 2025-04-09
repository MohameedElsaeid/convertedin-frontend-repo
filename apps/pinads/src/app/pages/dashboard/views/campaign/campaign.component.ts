import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageConstants } from '@pinads/shared/constants';

@Component({
  selector: 'convertedin-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone:true,
  imports:[RouterOutlet]
})
export class CampaignComponent {
  readonly routeList = [
    {
      label: 'campaign.sidebar.overview',
      icon: 'overview',
      link: '/campaign/overview',
    },
    {
      label: 'campaign.sidebar.campaigns',
      icon: 'campaign',
      link: '/campaign',
    },
  ];
  home = { icon: 'pi pi-home', routerLink: '/campaign/overview' };
  user = JSON.parse(localStorage.getItem(LocalStorageConstants.USER)!);
}
