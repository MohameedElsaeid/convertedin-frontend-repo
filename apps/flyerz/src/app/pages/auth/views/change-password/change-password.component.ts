import { Component, HostBinding, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, finalize, take, tap, throwError } from 'rxjs';
import { changePasswordImports } from './imports';
import { AuthState, selectAllAuth } from '@flyerz/store/auth';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
import { confirmPasswordValidator } from '@flyerz/shared/utilities';
import { Router } from '@angular/router';
import { AuthApi, UserData } from '@flyerz/shared/api';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AppActions } from '@flyerz/store/app';
import { AppInitializerService } from 'apps/flyerz/src/app/core/services';

@Component({
  selector: 'convertedin-change-password',
  standalone: true,
  imports: changePasswordImports,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-5';
  authData$!: Observable<AuthState>;
  isLoading: boolean = false;
  form: FormGroup = this.__formBuilder.group(
    {
      password: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant(
              'common-form-validations.required'
            ),
          }),
          RxwebValidators.pattern({
            message: this.__translate.instant(
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
            message: this.__translate.instant(
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
          this.__translate.instant('auth.password.not-matched')
        ),
    }
  );
  //#endregion

  constructor(
    private __store: Store,
    private __formBuilder: FormBuilder,
    private __translate: TranslateService,
    private __router: Router,
    private __authApi: AuthApi,
    private __toast: MessageService,
    private __appInit: AppInitializerService
  ) {}

  ngOnInit(): void {
    this.authData$ = this.__store.select(selectAllAuth).pipe(
      tap((data) => {
        if (!data.mobileNumber && !data.otp) {
          this.__router.navigate(['/auth']);
        }
      })
    );
  }

  //#region Methods
  submitChangePassword(authData: AuthState): void {
    this.form.valid
      ? this.changePassword(authData)
      : this.form.markAllAsTouched();
  }

  changePassword(authData: AuthState): void {
    this.isLoading = true;
    this.__authApi
      .forgotPassword(
        authData.mobileNumber,
        authData.countryCode,
        this.form.value?.password,
        this.form.value?.passwordConfirmation,
        authData.otp
      )
      .pipe(
        take(1),
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
      .subscribe(({ data }) => {
        this.changePasswordSuccess(data);
      });
  }

  changePasswordSuccess(data: UserData): void {
    this.__toast.add({
      summary: this.__translate.instant('auth.forget-password.change-success'),
      severity: 'success',
    });
    this.__store.dispatch(AppActions.setUserData({ user: data }));
    this.__appInit.getValidations();
    this.__router.navigate(['/my-dashboard']);
  }
  //#endregion
}
