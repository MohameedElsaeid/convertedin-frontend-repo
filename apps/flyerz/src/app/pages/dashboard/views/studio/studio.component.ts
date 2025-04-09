import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { RouterLink } from '@angular/router';
import { provideCreateAiMediaApi } from '@flyerz/shared/api';
import { HeaderComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';

@Component({
  selector: 'convertedin-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.scss'],
  standalone: true,
  imports: [TranslateModule, HeaderComponent, RouterLink, TabMenuModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideCreateAiMediaApi()],
})
export class StudioComponent {
  @HostBinding('class') class =
    'flex flex-column flex-grow-1 max-h-full pt-4 gap-4';

  activeTab!: MenuItem;
  items: MenuItem[] = [
    // Image
    {
      label: 'dashboard.studio.tabs.1',
      routerLink: '/my-dashboard/studio/ai-image',
    },
    // Video
    // {
    //   label: 'dashboard.studio.tabs.2',
    //   routerLink: '/my-dashboard/studio/ai-video',
    // },
  ];
}
