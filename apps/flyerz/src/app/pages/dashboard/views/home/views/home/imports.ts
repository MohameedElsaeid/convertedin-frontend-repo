import { CommonModule } from '@angular/common';
import {
  HeaderComponent,
  SpinnerComponent,
  InsightsCardComponent,
} from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { RouterLink } from '@angular/router';

export const homeImports = [
  CommonModule,
  HeaderComponent,
  ButtonModule,
  TranslateModule,
  DividerModule,
  SpinnerComponent,
  InsightsCardComponent,
  InfiniteScrollModule,
  AdsListComponent,
  RouterLink,
];
