import { CommonModule } from '@angular/common';
import { HeaderComponent, SpinnerComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import SocialMediaCardComponent from './components/social-media-card/social-media-card.component';
import { AccountsBannerComponent } from './components/accounts-banner/accounts-banner.component';

export const socialMediaImports = [
  CommonModule,
  HeaderComponent,
  TranslateModule,
  ButtonModule,
  SocialMediaCardComponent,
  SpinnerComponent,
  AccountsBannerComponent,
];
