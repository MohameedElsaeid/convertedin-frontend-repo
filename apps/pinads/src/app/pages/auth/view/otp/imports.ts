import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ControlErrorsModule } from '@convertedin/ui';
import { TranslateModule } from '@ngx-translate/core';
import { CountDownTimerPipe } from '@pinads/shared/pipes/count-down.pipe';
import { NgxOtpInputModule } from 'ngx-otp-input';

export const otpImports = [
  CommonModule,
  ReactiveFormsModule,
  NgxOtpInputModule,
  CountDownTimerPipe,
  RouterLink,
  ControlErrorsModule,
  AsyncPipe,
  TranslateModule
];
