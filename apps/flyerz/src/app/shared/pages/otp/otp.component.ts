import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgxOtpInputComponent, NgxOtpInputConfig } from 'ngx-otp-input';
import { otpImports } from './imports';
import { Store } from '@ngrx/store';
import { AuthActions, AuthState, selectAllAuth } from '@flyerz/store/auth';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  of,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  AuthApi,
  Provider,
  Register,
  provideAuthApi,
} from '@flyerz/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AppActions } from '@flyerz/store/app';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { LocalStorageConstants } from '@flyerz/shared/constants';

@Component({
  selector: 'convertedin-otp',
  standalone: true,
  imports: otpImports,
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [provideAuthApi()],
})
export class OtpComponent implements OnInit, OnDestroy {
  //#region Declerations
  @ViewChild('otpComponent') otpComponent!: NgxOtpInputComponent;

  private __unsubscriber: Subject<void> = new Subject();

  otpInputConfig: NgxOtpInputConfig = {
    otpLength: 6,
  };
  isLoading: boolean = false;
  otp: string = '';
  intervalId: any;
  countdown: number = 60;
  authData$!: Observable<AuthState>;
  userData!: AuthState;
  errorMsg!: string;
  changePhone: boolean = false;
  provider!: Provider;
  showSecurityBanner: boolean = false;
  //#endregion

  constructor(
    private __store: Store,
    private __authApi: AuthApi,
    private __router: Router,
    private __activeRoute: ActivatedRoute,
    private __toast: MessageService,
    private __translate: TranslateService,
    private __location: Location
  ) {}

  ngOnInit(): void {
    this.startCountdown();
    this.subscribeToStore();
    this.showSecurityBanner =
      !!this.__activeRoute.snapshot.queryParams['securityReset'];

    const changePhone = this.__activeRoute.snapshot.data['changePhone'];
    if (changePhone) {
      this.changePhone = JSON.parse(changePhone);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  subscribeToStore(): void {
    this.authData$ = this.__store.select(selectAllAuth).pipe(
      tap((data) => {
        if (!data.countryCode || !data.mobileNumber || !data.code) {
          this.__router.navigate(['/auth/login']);
        } else {
          this.userData = data;
          this.getOtp();
        }
      })
    );
  }

  inputChange(event: any): void {
    this.otp = event.join('');
  }

  resend(): void {
    this.otp = '';
    this.otpComponent.clear();
    this.startCountdown();
  }

  startCountdown(): void {
    this.countdown = 60;
    this.intervalId = setInterval(() => {
      this.countdown > 0 ? this.countdown-- : clearInterval(this.intervalId);
    }, 1000);
  }

  getCountdown(): string {
    return this.countdown.toString().padStart(2, '0');
  }

  getOtp(): void {
    this.__authApi
      .sendOtp(this.userData.countryCode, this.userData.mobileNumber)
      .pipe(
        takeUntil(this.__unsubscriber),
        catchError((error: HttpErrorResponse) => {
          this.errorMsg = error.error?.message;
          return throwError(() => error);
        })
      )
      .subscribe(({ data }) => {
        if (data) {
          this.errorMsg = '';
          this.provider = data.provider;
        }
      });
  }

  verifyOtp(): void {
    this.isLoading = true;
    (this.provider === Provider.TWILIO
      ? this.__authApi.verifyOtpTwilio(
          this.userData.countryCode,
          this.userData.mobileNumber,
          this.otp
        )
      : this.__authApi.verifyOtp(
          this.userData.countryCode,
          this.userData.mobileNumber,
          this.otp
        )
    )
      .pipe(
        takeUntil(this.__unsubscriber),
        catchError((error: HttpErrorResponse) => {
          this.errorMsg = error.error?.message;
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        if (data) {
          this.errorMsg = '';
          this.goToNextStep();
        }
      });
  }

  goToNextStep(): void {
    const forgetPassword =
      !!this.__activeRoute.snapshot.queryParams['forgetPassword'] ||
      !!this.__activeRoute.snapshot.queryParams['securityReset'];
    const register = !!this.__activeRoute.snapshot.queryParams['register'];

    register && this.register();

    if (forgetPassword) {
      this.__store.dispatch(AuthActions.setOtp({ otp: this.otp }));
      this.__router.navigate(['/auth/change-password']);
    }
  }

  verifyOtpForNumberChanger(): void {
    this.isLoading = true;
    this.__authApi
      .changePhoneNumber(
        this.userData.countryCode,
        this.userData.mobileNumber,
        this.otp
      )
      .pipe(
        takeUntil(this.__unsubscriber),
        catchError((error: HttpErrorResponse) => {
          this.errorMsg = error.error?.message;
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(() => {
        this.__location.back();
        this.__toast.add({
          severity: 'success',
          summary: this.__translate.instant(
            'dashboard.settings.profile.change-number-success'
          ),
        });
      });
  }

  getRegisterData(data: AuthState): Register {
    return {
      countryCode: data.countryCode,
      countryId: JSON.parse(
        localStorage.getItem(LocalStorageConstants.COUNTRY_ID)!
      ),
      firstName: data.firstName,
      lastName: data.lastName,
      mobileNumber: data.mobileNumber,
      otp: this.otp,
      password: data.password!,
      passwordConfirmation: data.passwordConfirmation!,
    };
  }

  register(): void {
    this.isLoading = true;
    this.__authApi
      .register(this.getRegisterData(this.userData))
      .pipe(
        takeUntil(this.__unsubscriber),
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error?.message,
            severity: 'error',
          });
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((data) => {
        this.__store.dispatch(AppActions.setUserData({ user: data?.data }));
        this.__router.navigate(['/my-dashboard']);
      });
  }
  //#endregion
}
