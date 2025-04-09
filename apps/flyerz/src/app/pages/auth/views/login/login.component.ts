import { Component, HostBinding } from '@angular/core';
import { loginImports } from './imports';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApi } from '@flyerz/shared/api';
import { catchError, finalize, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
import { AppActions } from '@flyerz/store/app';
import { AppInitializerService } from 'apps/flyerz/src/app/core/services';
import { AuthActions } from '@flyerz/store/auth';

@Component({
  selector: 'convertedin-login',
  standalone: true,
  imports: loginImports,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  //#region Decleration
  @HostBinding('class') class = 'flex flex-column gap-5 mb-7';
  loginForm: FormGroup = this.__formBuilder.group({
    phone: [null, [RxwebValidators.required()]],
    password: [
      null,
      [
        RxwebValidators.required({
          message: this.__translate.instant('common-form-validations.required'),
        }),
      ],
    ],
  });
  isLoading: boolean = false;
  countryIso: string =
    localStorage.getItem(LocalStorageConstants.COUNTRY_ISO) || 'SA';
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __router: Router,
    private __authApi: AuthApi,
    private __store: Store,
    private __toast: MessageService,
    private __translate: TranslateService,
    private __appInit: AppInitializerService
  ) {}

  //#region Methods
  submitLogin(): void {
    this.loginForm.valid
      ? this.getLoginData()
      : this.loginForm.markAllAsTouched();
  }

  getLoginData(): void {
    this.isLoading = true;
    this.__authApi
      .checkMobileNumber({
        countryCode: this.loginForm.value.phone?.countryCode,
        mobileNumber: this.loginForm.value.phone?.number,
      })
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error?.message,
            severity: 'error',
          });
          this.isLoading = false;
          return throwError(() => error);
        })
      )
      .subscribe(({ data }) => {
        data?.code === 3
          ? this.__router.navigate(['/auth/register'])
          : this.login();
      });
  }

  login(): void {
    this.__authApi
      .loginWithPassword(
        this.loginForm.value.phone?.countryCode,
        this.loginForm.value.phone?.number,
        this.loginForm.value?.password
      )
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error?.message,
            severity: 'error',
          });

          if (error.error?.code === 14) {
            this.goToProtectionLayer();
          }

          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data }) => {
        this.__store.dispatch(AppActions.setUserData({ user: data }));
        this.__appInit.getValidations();
        this.__router.navigate(['/my-dashboard']);
      });
  }

  goToProtectionLayer(): void {
    this.__store.dispatch(
      AuthActions.setMobileNumberAndCountryCode({
        countryCode: this.loginForm.value.phone?.countryCode,
        mobileNumber: this.loginForm.value.phone?.number,
      })
    );
    this.__router.navigate(['/auth/otp'], {
      queryParams: {
        securityReset: true,
      },
    });
  }
  //#endregion
}
