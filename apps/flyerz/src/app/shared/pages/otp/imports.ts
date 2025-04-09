import { CommonModule } from '@angular/common';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { MessagesModule } from 'primeng/messages';
import { HeaderComponent } from '@flyerz/shared/components';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

export const otpImports = [
  CommonModule,
  NgxOtpInputModule,
  MessagesModule,
  HeaderComponent,
  TranslateModule,
  ButtonModule,
];
