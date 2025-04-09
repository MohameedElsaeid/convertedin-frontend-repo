import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { profileImports } from './imports';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthApi, UserData } from '@flyerz/shared/api';
import { Store } from '@ngrx/store';
import { AppActions } from '@flyerz/store/app';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { Router } from '@angular/router';
import { AuthActions } from '@flyerz/store/auth';

@Component({
  selector: 'convertedin-profile',
  standalone: true,
  imports: profileImports,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 justify-content-between flex-column';
  get dir() {
    return document.documentElement.dir;
  }

  private __unsubscriber: Subject<void> = new Subject();
  userData$!: Observable<{ data: UserData }>;
  loaders = {
    verifyEmail: false,
    update: false,
    data: true,
    removeAccount: false,
  };
  profileForm: FormGroup = this.__formBuilder.group({
    firstName: [
      null,
      [
        RxwebValidators.required({
          message: this.__translate.instant('common-form-validations.required'),
        }),
      ],
    ],
    lastName: [
      null,
      [
        RxwebValidators.required({
          message: this.__translate.instant('common-form-validations.required'),
        }),
      ],
    ],
    email: [
      null,
      [
        RxwebValidators.pattern({
          expression: {
            pattern:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          },
          message: this.__translate.instant('common-form-validations.email'),
        }),
      ],
    ],
    mobileNumber: [null],
  });
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __store: Store,
    private __dialog: DialogService,
    private __translate: TranslateService,
    private __authApi: AuthApi,
    private __toast: MessageService,
    private __router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  getUserData(): void {
    this.loaders.data = true;
    this.userData$ = this.__authApi.getUserData().pipe(
      tap(({ data }) => {
        this.__store.dispatch(AppActions.setUserData({ user: data }));
        this.profileForm.patchValue({ ...data?.user });
        this.profileForm.controls['email'].setValue(data?.user.email.email);
        this.profileForm.controls['mobileNumber'].setValue({
          countryCode: data?.user.mobileNumber.countryCode,
          number: data?.user.mobileNumber.number,
        });
      }),
      finalize(() => {
        this.loaders.data = false;
      })
    );
  }

  submitForm(userData: UserData): void {
    this.loaders.update = true;
    this.__authApi
      .updateUserData(
        userData.user.firstName !== this.profileForm.value.firstName
          ? this.profileForm.value.firstName
          : undefined,
        userData.user.lastName !== this.profileForm.value.lastName
          ? this.profileForm.value.lastName
          : undefined,
        userData.user.email.email !== this.profileForm.value.email
          ? this.profileForm.value.email
          : undefined
      )
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          this.loaders.update = false;
        }),
        catchError((error: HttpErrorResponse) => this.catchResponseError(error))
      )
      .subscribe(() => {
        this.__toast.add({
          summary: this.__translate.instant(
            'dashboard.settings.profile.update-success'
          ),
          severity: 'success',
        });
        this.getUserData();
      });
  }

  deleteAccount(): void {
    import(
      '@flyerz/shared/components/confirm-popup/confirm-popup.component'
    ).then((component) => {
      this.__dialog.open(component.ConfirmPopupComponent, {
        styleClass: 'confirm-popup',
        data: {
          btnText: 'dashboard.settings.profile.delete-account',
          title: 'common.confirm',
          onConfirm: () => {
            this.removeAccout();
          },
        },
      });
    });
  }

  removeAccout(): void {
    this.loaders.removeAccount = true;
    this.__authApi
      .removeAccount()
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          this.loaders.removeAccount = false;
        }),
        catchError((error: HttpErrorResponse) => this.catchResponseError(error))
      )
      .subscribe(() => {
        this.__toast.add({
          summary: this.__translate.instant(
            'dashboard.settings.profile.remove-success'
          ),
          severity: 'success',
        });
        localStorage.removeItem(LocalStorageConstants.TOKEN);
        this.__router.navigate(['/auth']);
      });
  }

  sendOtp(): void {
    this.__store.dispatch(
      AuthActions.setMobileNumberAndCountryCode({
        countryCode: this.profileForm.value.mobileNumber.countryCode,
        mobileNumber: this.profileForm.value.mobileNumber.number,
      })
    );
  }

  verifyEmail(): void {
    this.loaders.verifyEmail = true;
    this.__authApi
      .verifyEmail(this.profileForm.value.email)
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          this.loaders.verifyEmail = false;
        }),
        catchError((error: HttpErrorResponse) => this.catchResponseError(error))
      )
      .subscribe(() => {
        this.openSuccessDialog();
        this.getUserData();
      });
  }

  openSuccessDialog(): void {
    import(
      '@flyerz/shared/components/success-popup/success-popup.component'
    ).then((component) => {
      this.__dialog.open(component.SuccessPopupComponent, {
        styleClass: 'success-popup',
        data: {
          title: 'common.verify-mail-success',
          route: '/my-dashboard/settings/profile',
          btnText: 'common.okay',
        },
      });
    });
  }

  catchResponseError(error: HttpErrorResponse): Observable<any> {
    this.__toast.add({
      summary: error.error?.message,
      severity: 'error',
    });
    return throwError(() => error);
  }

  isEmailVerified(userData: UserData): boolean {
    return (
      userData.user.email.isVerified &&
      this.profileForm.value['email'] === userData.user.email.email
    );
  }

  canChangeNumber(userData: UserData): boolean {
    return !this.profileForm.value.mobileNumber?.number.includes(
      userData.user.mobileNumber.number
    );
  }
  //#endregion
}
