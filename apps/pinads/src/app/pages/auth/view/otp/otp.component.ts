import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
} from '@angular/core';
import { NgxOtpInputConfig } from 'ngx-otp-input';
import {
  BehaviorSubject,
  Observable,
  finalize,
  interval,
  scan,
  startWith,
  takeWhile,
} from 'rxjs';
import { otpImports } from './imports';
import { FormControl, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { AuthApi } from '@pinads/shared/api/auth';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppActions } from '@pinads/store/app';
import { SessionStorageConstants } from '@pinads/shared/constants/storage/sessionstorage.constant';
import { OtpState } from '@pinads/shared/models';

@Component({
  selector: 'convertedin-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: otpImports,
  host: {
    class: 'flex justify-content-center align-items-center h-full',
  },
})
export class OtpComponent implements OnInit {
  readonly EXPIRE_TIME_IN_SECONDS = 300; // 5 minutes
  readonly RESEND_WAITING_TIME_IN_SECONDS = 240; // 5 minutes minus 1 minute
  readonly ONE_SECONDS = 1000;

  countDownTimer$!: Observable<number>;
  isLoading$ = new BehaviorSubject<boolean>(false);
  isResendOTP$ = new BehaviorSubject<boolean>(false);
  otpStartTime = this.EXPIRE_TIME_IN_SECONDS;
  otpData!: OtpState;
  config: NgxOtpInputConfig = {
    otpLength: 6,
  };

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

  constructor(
    private authApi: AuthApi,
    private destroyRef: DestroyRef,
    private location: Location,
    private router: Router,
    private store: Store,
    private translate: TranslateService
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

  goBack() {
    this.location.back();
  }

  resendOTP() {
    if (this.otpData.isForgotPassword) {
      this.forgotPasswordResendOtpApi();
      return;
    }
    this.resendOTPApi();
  }

  resendOTPApi() {
    this.isResendOTP$.next(true);
    this.authApi
      .resendOTP()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isResendOTP$.next(false);
        })
      )
      .subscribe((res) => {
        this.resetOtpState();
      });
  }
  forgotPasswordResendOtpApi() {
    this.isResendOTP$.next(true);
    this.authApi
      .forgotPassword(this.otpData.email)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isResendOTP$.next(false);
        })
      )
      .subscribe((res) => {
        this.resetOtpState();
      });
  }
  resetOtpState() {
    const otpData: OtpState = {
      email: this.otpData.email,
      otpStartDate: new Date(Date.now()),
      isForgotPassword: this.otpData.isForgotPassword,
    };
    sessionStorage.setItem(
      SessionStorageConstants.otp_data,
      JSON.stringify(otpData)
    );
    this.initializeCounter(this.EXPIRE_TIME_IN_SECONDS);
  }

  submit() {
    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }
    if (this.otpData.isForgotPassword) {
      this.forgotPasswordVerifyApi();
      return;
    }
    this.verifyOTPApi();
  }
  verifyOTPApi() {
    this.isLoading$.next(true);
    this.authApi
      .verifyOTP(this.otpForm.controls.code.value!)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        sessionStorage.removeItem(SessionStorageConstants.otp_data);
        this.store.dispatch(
          AppActions.setEmailVerified({ email_verified: true })
        );
        this.router.navigate(['/account/google']);
      });
  }
  forgotPasswordVerifyApi() {
    this.isLoading$.next(true);
    this.authApi
      .forgotPasswordVerify({
        otp: this.otpForm.value.code!,
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
          SessionStorageConstants.forgot_password_token,
          res.data.token
        );
        this.router.navigate(['/auth/reset-password']);
      });
  }
}
