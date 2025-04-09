import { Component, HostBinding } from '@angular/core';
import { changePasswordImports } from './imports';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
import { confirmPasswordValidator } from '@flyerz/shared/utilities';
import { AuthApi, provideAuthApi } from '@flyerz/shared/api';
import { Router } from '@angular/router';
import { catchError, take, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'convertedin-change-password',
  standalone: true,
  imports: changePasswordImports,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  providers: [provideAuthApi()],
})
export class ChangePasswordComponent {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-5';
  isLoading: boolean = false;
  form: FormGroup = this.__formBuilder.group(
    {
      oldPassword: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant(
              'common-form-validations.required'
            ),
          }),
        ],
      ],
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
    private __formBuilder: FormBuilder,
    private __translate: TranslateService,
    private __authApi: AuthApi,
    private __router: Router,
    private __toast: MessageService
  ) {}

  //#region Methods
  submitChangePassword(): void {
    this.isLoading = true;
    this.__authApi
      .changePassword(
        this.form.value.oldPassword,
        this.form.value.password,
        this.form.value.passwordConfirmation
      )
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
      .subscribe(() => {
        this.__router.navigate(['/my-dashboard/settings/profile']);
        this.__toast.add({
          summary: this.__translate.instant(
            'auth.forget-password.change-success'
          ),
          severity: 'success',
        });
      });
  }
  //#endregion
}
