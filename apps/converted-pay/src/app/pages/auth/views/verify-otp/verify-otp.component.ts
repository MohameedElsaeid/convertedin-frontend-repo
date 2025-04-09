import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ControlErrorsModule } from '@convertedin/ui';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {
  BehaviorSubject,
  Observable,
  finalize,
  interval,
  scan,
  startWith,
  takeWhile,
} from 'rxjs';
import { NgxOtpInputConfig, NgxOtpInputModule } from 'ngx-otp-input';
import { OtpState } from '@converted-pay/shared/models/interfaces';
import { SessionStorageConstants } from '@converted-pay/shared/constants/localstorage/sessionstorage.constant';
import { AuthApi } from '@converted-pay/shared/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CountDownTimerPipe } from '@converted-pay/shared/pipes';
import { EVENTS_LOG } from '@converted-pay/shared/api/log';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectAppLangComponent } from '@converted-pay/shared/components';
@Component({
  selector: 'convertedin-verify-otp',
  standalone: true,
  imports: [
    CommonModule,
    ControlErrorsModule,
    ReactiveFormsModule,
    NgxOtpInputModule,
    RouterLink,
    CountDownTimerPipe,
    LogEventsDirective,
    TranslateModule,
    SelectAppLangComponent
  ],
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {
  readonly EVENTS_LOG = EVENTS_LOG;

  otpForm = new FormGroup({
    code: new FormControl<string>('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.otp.required'),
      }),
      RxwebValidators.minLength({
        value: 6,
        message: this.translate.instant('validations.otp.minLength'),
      }),
    ]),
  });
  config: NgxOtpInputConfig = {
    otpLength: 6,
  };
  readonly EXPIRE_TIME_IN_SECONDS = 300; // 5 minutes
  readonly RESEND_WAITING_TIME_IN_SECONDS = 240; // 5 minutes minus 1 minute
  readonly ONE_SECONDS = 1000;

  countDownTimer$!: Observable<number>;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isResendOTP$ = new BehaviorSubject<boolean>(false);
  otpStartTime = this.EXPIRE_TIME_IN_SECONDS;
  otpData!: OtpState;
  constructor(
    private authApi: AuthApi,
    private destroyRef: DestroyRef,
    private router: Router,
    private translate:TranslateService
  ) {}

  ngOnInit(): void {
    this.getOTPData();
    this.initializeCounter(this.otpStartTime);
  }

  getOTPData() {
    this.otpData = JSON.parse(
      sessionStorage.getItem(SessionStorageConstants.otp_data) ?? 'null'
    );
    if (!this.otpData) {
      this.router.navigate(['/auth/login']);
      return;
    }
    const date = new Date(Date.now());
    const otpDate = new Date(this.otpData.otpStartDate!);
    this.otpStartTime =
      this.EXPIRE_TIME_IN_SECONDS -
      Math.floor((date.getTime() - otpDate.getTime()) / 1000);
    if (this.otpStartTime <= 0) this.router.navigate(['/auth/login']);
  }

  initializeCounter(val: number) {
    this.countDownTimer$ = interval(this.ONE_SECONDS).pipe(
      startWith(val),
      scan((acc, _) => acc - 1),
      takeWhile((val) => val >= 0)
    );
  }

  otpChange(e: any) {
    this.otpForm.patchValue({ code: e.join('') });
  }
  resendOTP() {
    this.isResendOTP$.next(true);
    this.authApi
      .sendOtp(this.otpData.email)
      .pipe(
        finalize(() => {
          this.isResendOTP$.next(false);
        })
      )
      .subscribe((res) => {
        const otpData = {
          email:this.otpData.email,
          otpStartDate: new Date(Date.now()),
          isForgotPassword: true,
        };
        sessionStorage.setItem(
          SessionStorageConstants.otp_data,
          JSON.stringify(otpData)
        );
      });
      this.initializeCounter(this.EXPIRE_TIME_IN_SECONDS)
  }
  submit() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    this.isLoading$.next(true);
    this.authApi
      .verifyOtp({
        otp: this.otpForm.controls.code.value!,
        email: this.otpData.email,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        sessionStorage.removeItem(SessionStorageConstants.otp_data);
        sessionStorage.setItem(
          SessionStorageConstants.forgot_password_data,
          JSON.stringify({
            otp: this.otpForm.controls.code.value!,
            email: this.otpData.email,
          })
        );
        this.router.navigate(['/auth/reset-password']);
      });
  }
}
