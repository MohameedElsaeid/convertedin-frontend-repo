import { Component, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsModule } from '@convertedin/ui';
import { PasswordModule } from 'primeng/password';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, finalize, throwError } from 'rxjs';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { InputTextModule } from 'primeng/inputtext';
import { AuthApi, LoginPayload } from '@converted-pay/shared/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LocalStorageConstants } from '@converted-pay/shared/constants';
import { Store } from '@ngrx/store';
import { AppActions } from '@converted-pay/store/app';
import { EVENTS_LOG } from '@converted-pay/shared/api/log';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { handleBackendErrors } from '@converted-pay/shared/utilities/validation-error';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectAppLangComponent } from '@converted-pay/shared/components';
@Component({
  selector: 'convertedin-login',
  standalone: true,
  imports: [
    CommonModule,
    ControlErrorsModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    RouterLink,
    LogEventsDirective,
    TranslateModule,
    SelectAppLangComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'block h-full',
  },
})
export class LoginComponent {
  readonly EVENTS_LOG = EVENTS_LOG;
  loginForm = new FormGroup({
    email: new FormControl<string>('', [
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
    private activeRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  submit() {
    const query = this.activeRoute.snapshot.queryParams;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading$.next(true);
    this.authApi
      .login({
        ...this.loginForm.value,
        email: this.loginForm.value.email!.replace(/\s+/g, ''),
        query,
      } as LoginPayload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          handleBackendErrors(err.error.errors, this.loginForm);
          return throwError(() => err);
        }),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.store.dispatch(
          AppActions.setUserData({
            userData: res.data,
          })
        );
        localStorage.setItem(LocalStorageConstants.TOKEN, res.data.token);
        this.router.navigate(['/dashboard/home']);
      });
  }
}
