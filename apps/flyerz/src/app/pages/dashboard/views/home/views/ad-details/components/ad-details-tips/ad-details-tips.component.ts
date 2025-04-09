import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-ad-details-tips',
  standalone: true,
  imports: [TranslateModule, NgFor],
  templateUrl: './ad-details-tips.component.html',
  styleUrls: ['./ad-details-tips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdDetailsTipsComponent {
  @HostBinding('class') class = 'flex flex-column ad-details__tips';

  tips: Array<{
    title: string;
    subtitle: string;
    image: string;
  }> = [
    {
      title: 'dashboard.ad-details.tips.1.title',
      subtitle: 'dashboard.ad-details.tips.1.subtitle',
      image: 'assets/images/calendar.png',
    },
    {
      title: 'dashboard.ad-details.tips.2.title',
      subtitle: 'dashboard.ad-details.tips.2.subtitle',
      image: 'assets/images/ruler.png',
    },
    {
      title: 'dashboard.ad-details.tips.3.title',
      subtitle: 'dashboard.ad-details.tips.3.subtitle',
      image: 'assets/images/target.png',
    },
    {
      title: 'dashboard.ad-details.tips.4.title',
      subtitle: 'dashboard.ad-details.tips.4.subtitle',
      image: 'assets/images/money.png',
    },
  ];
}
