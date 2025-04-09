import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, finalize } from 'rxjs';
import { AuthApi } from '@pinads/shared/api/auth';
import { ControlErrorsModule } from '@convertedin/ui';
import { Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SessionStorageConstants } from '@pinads/shared/constants/storage/sessionstorage.constant';

@Component({
  selector: 'convertedin-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ControlErrorsModule,
    RouterLink,
    InputTextModule,
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  host: {
    class: 'flex justify-content-center align-items-center h-full',
  },
})
export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.email.required'),
      }),
      RxwebValidators.email({
        message: this.translate.instant('validations.email.mail'),
      }),
    ]),
  });
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(
    private translate: TranslateService,
    private authApi: AuthApi,
    private router: Router
  ) {}
  submit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }
    const { email } = this.forgotPasswordForm.value;
    this.isLoading$.next(true);
    this.authApi
      .forgotPassword(email!)
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
