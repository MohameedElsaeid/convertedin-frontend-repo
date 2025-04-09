import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ControlErrorsModule } from '@convertedin/ui';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, finalize } from 'rxjs';
import { SessionStorageConstants } from '@converted-pay/shared/constants/localstorage/sessionstorage.constant';
import {
  AuthApi,
  UpdatePasswordPayload,
  VerifyOtpPayload,
} from '@converted-pay/shared/api';
import { EVENTS_LOG } from '@converted-pay/shared/api/log';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectAppLangComponent } from '@converted-pay/shared/components';

@Component({
  selector: 'convertedin-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ControlErrorsModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    TranslateModule,
    LogEventsDirective,
    SelectAppLangComponent
  ],
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  host: {
    class: 'block h-full',
  },
})
export class ResetPasswordComponent implements OnInit {
  readonly EVENTS_LOG=EVENTS_LOG;

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.password.required'),
      }),
      RxwebValidators.minLength({
        value: 8,
        message: this.translate.instant('validations.password.minLength'),
      }),
      // RxwebValidators.pattern({
      //   expression: {
      //     strongPassword:
      //       /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=.*[@$!%#?&])(?=\D*\d).{8,}$/,
      //   },
      //   message:
      //     'Password must be minimum 8 character and contain (upper case - lower case - number - special character)',
      // }),
    ]),
    passwordConfirmation: new FormControl('', [
      RxwebValidators.compare({
        fieldName: 'password',
        message: this.translate.instant('validations.confirmPassword.match'),
      }),
    ]),
  });
  forgotPasswordData!: VerifyOtpPayload;
  isLoading$ = new BehaviorSubject(false);

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private translate:TranslateService
  ) {}
  ngOnInit(): void {
    this.forgotPasswordData = JSON.parse(
      sessionStorage.getItem(SessionStorageConstants.forgot_password_data) ??
        'null'
    );

    if (!this.forgotPasswordData) {
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
      .updatePassword({
        ...this.forgotPasswordData,
        ...this.resetPasswordForm.value!,
      } as UpdatePasswordPayload)
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
