import { AsyncPipe, NgIf } from '@angular/common';
import { Component, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ControlErrorsModule } from '@convertedin/ui';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthApi } from '@pinads/shared/api/auth';
import { Login } from '@pinads/shared/api/auth/models/interfaces/login.interface';
import {
  LocalStorageConstants,
  SessionStorageConstants,
} from '@pinads/shared/constants';
import { OtpState } from '@pinads/shared/models';
import { AppActions } from '@pinads/store/app';
import {
  RxReactiveFormsModule,
  RxwebValidators,
} from '@rxweb/reactive-form-validators';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { BehaviorSubject, filter, finalize, switchMap, tap } from 'rxjs';

@Component({
  selector: 'convertedin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RxReactiveFormsModule,
    ControlErrorsModule,
    InputTextModule,
    AsyncPipe,
    NgIf,
    RouterLink,
    PasswordModule,
    TranslateModule,
  ],
  host: {
    class: 'flex justify-content-center align-items-center h-full',
  },
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.email.required'),
      }),
      RxwebValidators.email({
        message: this.translate.instant('validations.email.mail'),
      }),
    ]),
    password: new FormControl<string>('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.password.required'),
      }),
    ]),
  });

  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private authApi: AuthApi,
    private destroyRef: DestroyRef,
    private router: Router,
    private store: Store,
    private translate: TranslateService
  ) {}

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);

    this.authApi
      .login(this.loginForm.value as Login)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((res) => {
          localStorage.setItem(
            LocalStorageConstants.TOKEN,
            res.data.access_token
          );
          this.store.dispatch(
            AppActions.setUserData({
              userData:res.data,
            })
          );
          if (!res.data.email_verified) {
            this.navigateToOtp(res.data.email);
            return;
          }
        }),
        filter((res) => res.data.email_verified!),
        switchMap(() => this.authApi.checkGoogleToken()),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        if (res.data.connected_before) {
          this.router.navigate(['/dashboard/overview']);
          return;
        }
        this.router.navigate(['/account/google']);
      });
  }
  navigateToOtp(email: string) {
    this.authApi.resendOTP().subscribe(() => {
      const otpData: OtpState = {
        email,
        otpStartDate: new Date(Date.now()),
      };
      sessionStorage.setItem(
        SessionStorageConstants.otp_data,
        JSON.stringify(otpData)
      );
      this.router.navigate(['/auth/verify-otp']);
    });
  }
}
