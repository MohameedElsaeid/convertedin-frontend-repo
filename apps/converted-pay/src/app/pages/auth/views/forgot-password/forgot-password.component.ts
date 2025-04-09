import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ControlErrorsModule } from '@convertedin/ui';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthApi } from '@converted-pay/shared/api';
import { SessionStorageConstants } from '@converted-pay/shared/constants/localstorage/sessionstorage.constant';
import { EVENTS_LOG } from '@converted-pay/shared/api/log';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectAppLangComponent } from '@converted-pay/shared/components';
@Component({
  selector: 'convertedin-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ControlErrorsModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    LogEventsDirective,
    TranslateModule,
    SelectAppLangComponent
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  host: {
    class: 'block h-full',
  },
})
export class ForgotPasswordComponent {
  readonly EVENTS_LOG = EVENTS_LOG;
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.email.required'),
      }),
      RxwebValidators.pattern({
        expression: {
          email:
            /^\s*([a-zA-Z0-9._%+-]+\s*@\s*[a-zA-Z0-9.-]+\s*\.\s*[a-zA-Z]{2,})\s*$/,
        },

        message: this.translate.instant('validations.email.mail'),
      }),
    ]),
  });
  isLoading$ = new BehaviorSubject(false);

  constructor(
    private authApi: AuthApi,
    private router: Router,
    private translate: TranslateService
  ) {}

  submit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    const { email } = this.forgotPasswordForm.value;
    this.isLoading$.next(true);
    this.authApi
      .sendOtp(email!.replace(/\s+/g, '')!)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.navigateToOtp(email!);
      });
  }
  navigateToOtp(email: string) {
    const otpData = {
      email,
      otpStartDate: new Date(Date.now()),
      isForgotPassword: true,
    };
    sessionStorage.setItem(
      SessionStorageConstants.otp_data,
      JSON.stringify(otpData)
    );
    this.router.navigate(['/auth/verify-otp']);
  }
}
