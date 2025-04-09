import { Component, OnInit } from '@angular/core';
import { registerImports } from './imports';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { Store } from '@ngrx/store';
import { Observable, catchError, finalize, take, throwError } from 'rxjs';
import { AuthActions, AuthState, selectAllAuth } from '@flyerz/store/auth';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { AuthApi } from '@flyerz/shared/api';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { confirmPasswordValidator } from '@flyerz/shared/utilities';

@Component({
  selector: 'convertedin-register',
  standalone: true,
  imports: registerImports,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //#region Declerations
  registerForm: FormGroup = this.__formBuilder.group(
    {
      firstName: [
        null,
        [
          RxwebValidators.required({
            message: this.__transalte.instant(
              'common-form-validations.required'
            ),
          }),
        ],
      ],
      lastName: [
        null,
        [
          RxwebValidators.required({
            message: this.__transalte.instant(
              'common-form-validations.required'
            ),
          }),
        ],
      ],
      mobileNumber: [null, [RxwebValidators.required()]],
      password: [
        null,
        [
          RxwebValidators.required({
            message: this.__transalte.instant(
              'common-form-validations.required'
            ),
          }),
          RxwebValidators.pattern({
            message: this.__transalte.instant(
              'auth.register.wrong-password-format'
            ),
            expression: {
              pattern: /^(?=.*\d)(?=.*[A-Za-z]).{8,}$/,
            },
          }),
        ],
      ],
      passwordConfirmation: [
        null,
        [
          RxwebValidators.required({
            message: this.__transalte.instant(
              'common-form-validations.required'
            ),
          }),
        ],
      ],
    },
    {
      validator: (control: AbstractControl) =>
        confirmPasswordValidator(
          control,
          'password',
          'passwordConfirmation',
          this.__transalte.instant('auth.password.not-matched')
        ),
    }
  );
  authData$!: Observable<AuthState>;
  isLoading: boolean = false;
  countryIso: string =
    localStorage.getItem(LocalStorageConstants.COUNTRY_ISO) || 'EG';
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __store: Store,
    private __router: Router,
    private __transalte: TranslateService,
    private __authApi: AuthApi,
    private __toast: MessageService
  ) {}

  ngOnInit(): void {
    this.authData$ = this.__store.select(selectAllAuth);
  }

  //#region Methods
  register(): void {
    this.registerForm.valid
      ? this.checkPhoneNumber()
      : this.registerForm.markAllAsTouched();
  }

  checkPhoneNumber(): void {
    this.isLoading = true;
    this.__authApi
      .checkMobileNumber({
        countryCode: this.registerForm.value.mobileNumber?.countryCode,
        mobileNumber: this.registerForm.value.mobileNumber?.number,
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
        if (data?.code === 3) {
          this.dispatchRegisterData(data?.code);
          this.__router.navigate(['/auth/otp'], {
            queryParams: {
              register: true,
            },
          });
        } else {
          this.showErrorToast(
            this.__transalte.instant('auth.register.user-exist')
          );
        }
      });
  }

  showErrorToast(message: string): void {
    this.__toast.add({
      summary: message,
      severity: 'error',
    });
  }

  dispatchRegisterData(code: number): void {
    this.__store.dispatch(
      AuthActions.setRegisterData({
        firstName: this.registerForm.value?.firstName,
        lastName: this.registerForm.value?.lastName,
        mobileNumber: this.registerForm.value.mobileNumber?.number,
        countryCode: this.registerForm.value.mobileNumber?.countryCode,
        password: this.registerForm.value?.password,
        passwordConfirmation: this.registerForm.value?.passwordConfirmation,
        code,
      })
    );
  }
  //#endregion
}
