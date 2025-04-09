import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LocalStorageConstants } from '@converted-pay/shared/constants';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  throwError,
} from 'rxjs';
import {
  AuthApi,
  CountryItem,
  RegisterPayload,
} from '@converted-pay/shared/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { AppActions } from '@converted-pay/store/app';
import { EVENTS_LOG } from '@converted-pay/shared/api/log';
import { Tooltip, TooltipModule } from 'primeng/tooltip';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { handleBackendErrors } from '@converted-pay/shared/utilities/validation-error';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SelectAppLangComponent } from '@converted-pay/shared/components';

@Component({
  selector: 'convertedin-register',
  standalone: true,
  imports: [
    CommonModule,
    ControlErrorsModule,
    PasswordModule,
    ReactiveFormsModule,
    InputTextModule,
    PhoneNumberInputComponent,
    RouterLink,
    TooltipModule,
    LogEventsDirective,
    DropdownModule,
    TranslateModule,
    SelectAppLangComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  host: {
    class: 'block h-full',
  },
})
export class RegisterComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(Tooltip) referralTooltip!: Tooltip;
  readonly EVENTS_LOG = EVENTS_LOG;

  registerForm = new FormGroup({
    firstName: new FormControl(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.firstName.required'),
      })
    ),
    lastName: new FormControl(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.lastName.required'),
      })
    ),
    companyName: new FormControl(
      '',
      RxwebValidators.required({
        message: this.translate.instant('validations.companyName.required'),
      })
    ),
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
    countryCode: new FormControl(''),
    mobileNumber: new FormControl<any>('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.mobileNumber.required'),
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
      // RxwebValidators.pattern({
      //   expression: {
      //     strongPassword: /[A-Z]/,
      //   },
      //   message: 'The password must contain at least one uppercase letter.',
      // }),
      // RxwebValidators.pattern({
      //   expression: {
      //     strongPassword: /[a-z]/,
      //   },
      //   message: 'The password must contain at least one lowercase letter.',
      // }),
      // RxwebValidators.pattern({
      //   expression: {
      //     strongPassword: /[@$!%#?&]/,
      //   },
      //   message:
      //     'The password must contain at least one special character from the set @$!%#?& .',
      // }),
      // RxwebValidators.pattern({
      //   expression: {
      //     strongPassword: /\d/,
      //   },
      //   message: 'The password must contain at least one digit.',
      // }),
    ]),
    passwordConfirmation: new FormControl('', [
      RxwebValidators.compare({
        fieldName: 'password',
        message: this.translate.instant('validations.confirmPassword.match'),
      }),
    ]),
    facebookMonthlyBudget: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant(
          'validations.facebookMonthlyBudget.required'
        ),
      }),
    ]),
    googleMonthlyBudget: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant(
          'validations.googleMonthlyBudget.required'
        ),
      }),
    ]),
    country: new FormControl<CountryItem | null>(null, [
      RxwebValidators.required({
        message: this.translate.instant('validations.country.required'),
      }),
    ]),
    referralCode: new FormControl(''),
  });

  isLoading$ = new BehaviorSubject<boolean>(false);
  isLoadingCountry$ = new BehaviorSubject<boolean>(false);
  countryList$!: Observable<Array<CountryItem>>;
  budgetList: Array<string> = [];
  perferredCountry = 'EG';

  constructor(
    private store: Store,
    private authApi: AuthApi,
    private destroyRef: DestroyRef,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService
  ) {}

  ngAfterViewInit(): void {
    this.referralTooltip.el.nativeElement.addEventListener(
      'click',
      this.referralTooltip.mouseEnterListener
    );
  }

  ngOnInit(): void {
    this.getCountryIsoFromUrl();

    const referralCode = this.activeRoute.snapshot.params['referralCode'];
    if (referralCode) {
      this.registerForm.controls['referralCode'].patchValue(referralCode);
    }
    this.getCountryList();
  }

  getCountryIsoFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const iso = urlParams.get('ISO');
    if (iso) this.perferredCountry = iso.toUpperCase();
  }

  onCountryChange(e: DropdownChangeEvent) {
    const value = e.value as CountryItem;
    this.budgetList = this.getBudgetList(value.currency.symbol);
  }
  getBudgetList(currency: string) {
    return [
      `1000 ${currency} - 5000 ${currency}`,
      `5000 ${currency} - 10,000 ${currency}`,
      `10,000 ${currency} - 50,000 ${currency}`,
      `50,000 ${currency} - 100,000 ${currency}`,
      `100,000 ${currency} - 250,000 ${currency}`,
      `250,000 ${currency} - 500,000 ${currency}`,
      `+500,000 ${currency}`,
    ];
  }
  getCountryList() {
    this.isLoadingCountry$.next(true);
    this.countryList$ = this.authApi.getCountryList().pipe(
      takeUntilDestroyed(this.destroyRef),
      map((res) => res.data.filter((item) => item.id === 1 || item.id === 7)),
      finalize(() => {
        this.isLoadingCountry$.next(false);
      })
    );
  }
  submit() {
    const query = this.activeRoute.snapshot.queryParams;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);

    this.authApi
      .register({
        ...this.registerForm.value,
        countryCode: this.registerForm.value.mobileNumber.countryCode,
        mobileNumber: this.registerForm.value.mobileNumber.number,
        email: this.registerForm.value.email!.replace(/\s+/g, ''),
        query,
        countryId: this.registerForm.value.country!.id,
      } as RegisterPayload)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          handleBackendErrors(err.error.errors, this.registerForm);
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

  ngOnDestroy(): void {
    this.referralTooltip.el?.nativeElement.removeEventListener(
      'click',
      this.referralTooltip.mouseEnterListener
    );
  }
}
