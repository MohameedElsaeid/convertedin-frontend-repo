import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ControlErrorsModule } from '@convertedin/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RxwebValidators, password } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthApi, ResetPasswordPayload } from '@pinads/shared/api/auth';
import { SessionStorageConstants } from '@pinads/shared/constants';

@Component({
  selector: 'convertedin-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ControlErrorsModule,
    RouterLink,
    PasswordModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  host: {
    class: 'flex justify-content-center align-items-center h-full pb-3',
  },
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.password.required'),
      }),
      RxwebValidators.minLength({
        value: 8,
        message: this.translate.instant('validations.password.minLength'),
      }),
      RxwebValidators.pattern({
        expression: {
          strongPassword: /[A-Z]/,
        },
        message: this.translate.instant('validations.password.uppercase'),
      }),
      RxwebValidators.pattern({
        expression: {
          strongPassword: /[a-z]/,
        },
        message: this.translate.instant('validations.password.lowercase'),
      }),
      RxwebValidators.pattern({
        expression: {
          strongPassword: /[@$!%#?&]/,
        },
        message: this.translate.instant(
          'validations.password.specialCharacter'
        ),
      }),
      RxwebValidators.pattern({
        expression: {
          strongPassword: /\d/,
        },
        message: this.translate.instant('validations.password.digit'),
      }),
    ]),
    password_confirmation: new FormControl('', [
      RxwebValidators.compare({
        fieldName: 'password',
        message: this.translate.instant('validations.password.confirmPassword'),
      }),
    ]),
  });
  isLoading$ = new BehaviorSubject<boolean>(false);
  token!: string;
  constructor(
    private translate: TranslateService,
    private authApi: AuthApi,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.token = sessionStorage.getItem(
      SessionStorageConstants.forgot_password_token
    )!;
    if (!this.token) {
      this.router.navigate(['/auth/login']);
      return;
    }
  }

  submit() {
    if (this.resetPasswordForm.invalid) {
      this.resetPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);
    this.authApi
      .resetPassword(
        this.token,
        this.resetPasswordForm.value as ResetPasswordPayload
      )
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.router.navigate(['/auth/login']);
      });
  }
}
