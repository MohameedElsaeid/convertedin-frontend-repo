import { Component, HostBinding } from '@angular/core';
import { forgetPasswordImports } from './imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { AuthApi } from '@flyerz/shared/api';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError, finalize, take } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '@flyerz/store/auth';

@Component({
  selector: 'convertedin-forget-password',
  standalone: true,
  imports: forgetPasswordImports,
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-4';
  form: FormGroup = this.__formBuilder.group({
    phone: [null, [Validators.required]],
  });
  countryIso: string =
    localStorage.getItem(LocalStorageConstants.COUNTRY_ISO) || 'SA';
  isLoading: boolean = false;
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __authApi: AuthApi,
    private __toast: MessageService,
    private __router: Router,
    private __translate: TranslateService,
    private __store: Store
  ) {}

  //#region Methods
  submit(): void {
    this.form.valid ? this.checkPhoneNumber() : this.form.markAllAsTouched();
  }

  checkPhoneNumber(): void {
    this.isLoading = true;
    this.__authApi
      .checkMobileNumber({
        countryCode: this.form.value.phone?.countryCode,
        mobileNumber: this.form.value.phone?.number,
      })
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          this.showErrorToast(error.error?.message);
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data }) => {
        data?.code === 3
          ? this.showErrorToast(
              this.__translate.instant('auth.forget-password.not-registered')
            )
          : this.goToOtp();
      });
  }

  goToOtp(): void {
    this.__store.dispatch(
      AuthActions.setMobileNumberAndCountryCode({
        countryCode: this.form.value.phone?.countryCode,
        mobileNumber: this.form.value.phone?.number,
      })
    );

    this.__router.navigate(['/auth/otp'], {
      queryParams: {
        forgetPassword: true,
      },
    });
  }

  showErrorToast(message: string): void {
    this.__toast.add({
      summary: message,
      severity: 'error',
    });
  }
  //#endregion
}
