import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ControlErrorsModule } from '@convertedin/ui';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { LoginPayload } from '@super-admin/shared/api/auth';
import { AuthApi } from '@super-admin/shared/api/auth/base/auth.base';
import { Router } from '@angular/router';
import { LocalStorageConstants } from '@super-admin/shared/constants';
import { BehaviorSubject, finalize } from 'rxjs';

@Component({
  selector: 'convertedin-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule,
    ControlErrorsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [
      RxwebValidators.required({ message: 'Email is required' }),
      RxwebValidators.email({
        message: 'Please input valid email',
      }),
    ]),
    password: new FormControl<string>('', [
      RxwebValidators.required({ message: 'Password is required' }),
    ]),
  });
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private authApi: AuthApi, private router: Router) {}

  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading$.next(true);
    this.authApi
      .login(this.loginForm.value as LoginPayload)
      .pipe(finalize(() => {
        this.isLoading$.next(false);
      }))
      .subscribe((res) => {
        localStorage.setItem(
          LocalStorageConstants.TOKEN,
          res.data.access_token
        );
        this.router.navigate(['/dashboard']);
      });
  }
}
