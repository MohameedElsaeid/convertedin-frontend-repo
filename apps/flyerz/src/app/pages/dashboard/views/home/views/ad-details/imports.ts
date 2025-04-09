import { CommonModule } from '@angular/common';
import {
  BackButtonComponent,
  SpinnerComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DetailsTimelineComponent } from './components/details-timeline/details-timeline.component';
import { AdDetailsTipsComponent } from './components/ad-details-tips/ad-details-tips.component';
import { MenuModule } from 'primeng/menu';
import { TabViewModule } from 'primeng/tabview';
import { AdDetailsStatisticsComponent } from './components/ad-details-statistics/ad-details-statistics.component';
import { AdDetailsDataComponent } from './components/ad-details-data/ad-details-data.component';
import { AdDetailsBannerComponent } from './components/ad-details-banner/ad-details-banner.component';
import { AdDetailsLeadsComponent } from './components/ad-details-leads/ad-details-leads.component';

export const adDetailsImports = [
  CommonModule,
  BackButtonComponent,
  ButtonModule,
  TranslateModule,
  TooltipModule,
  DetailsTimelineComponent,
  AdDetailsTipsComponent,
  SpinnerComponent,
  MenuModule,
  TabViewModule,
  AdDetailsStatisticsComponent,
  AdDetailsDataComponent,
  AdDetailsBannerComponent,
  AdDetailsLeadsComponent,
];
