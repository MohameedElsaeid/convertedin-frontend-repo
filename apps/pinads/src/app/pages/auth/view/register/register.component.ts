import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { BehaviorSubject, Observable, delay, finalize, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthApi, Register } from '@pinads/shared/api/auth';
import { ActivatedRoute, Router } from '@angular/router';
import {
  LocalStorageConstants,
  SessionStorageConstants,
} from '@pinads/shared/constants';
import { registerImports } from './imports';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppActions } from '@pinads/store/app';
import { OtpState } from '@pinads/shared/models';
@Component({
  selector: 'convertedin-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: registerImports,
  host: {
    class: 'flex justify-content-center align-items-center h-full pb-3',
  },
})
export class registerComponent {
  // categoryList: string[];
  accountForm = new FormGroup({
    name: new FormControl(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.name.required'),
      })
    ),
    email: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.email.required'),
      }),
      RxwebValidators.email({
        message: this.translate.instant('validations.email.mail'),
      }),
    ]),
    phone: new FormControl('', [
      RxwebValidators.required({
        // message: this.translate.instant('validations.phone.required'),
      }),
    ]),
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
    business_name: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.business_name.required'),
      }),
    ]),
    business_category: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant(
          'validations.business_category.required'
        ),
      }),
    ]),
  });

  isLoading$ = new BehaviorSubject<boolean>(false);
  isLoadingCategory$ = new BehaviorSubject<boolean>(false);
  categories$!: Observable<{ name: string; id: number }[]>;

  constructor(
    private store: Store,
    private authApi: AuthApi,
    private destroyRef: DestroyRef,
    private router: Router,
    private translate: TranslateService,
    private activeRoute: ActivatedRoute
  ) {
    this.getCategories();
  }

  getCategories() {
    this.isLoadingCategory$.next(true);
    this.categories$ = this.authApi.getCategories().pipe(
      map((res) =>
        res.data.map((item) => {
          const name =
            this.translate.currentLang === 'en' ? item.name_en : item.name_ar;
          return { name, id: item.id };
        })
      ),
      finalize(() => {
        this.isLoadingCategory$.next(false);
      })
    );
  }

  submit() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    const { utm_medium, utm_source } = this.activeRoute.snapshot.queryParams;

    this.isLoading$.next(true);

    this.authApi
      .register({
        ...this.accountForm.value,
        utm_medium,
        utm_source,
      } as Register)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        localStorage.setItem(
          LocalStorageConstants.TOKEN,
          res.data.access_token
        );
        this.store.dispatch(AppActions.setUserData({ userData: res.data }));
        this.navigateToOtp(res.data.email);
      });
  }
  navigateToOtp(email: string) {
    const otpData: OtpState = {
      email,
      otpStartDate: new Date(Date.now()),
    };
    sessionStorage.setItem(
      SessionStorageConstants.otp_data,
      JSON.stringify(otpData)
    );
    this.router.navigate(['/auth/verify-otp']);
  }
}
