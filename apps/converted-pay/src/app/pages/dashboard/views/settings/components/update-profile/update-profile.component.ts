import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlErrorsModule,
  PhoneNumberInputComponent,
} from '@convertedin/ui';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import {
  ProfilePayload,
  provideUserApi,
  UserApi,
} from '@converted-pay/shared/api/user';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BehaviorSubject, finalize, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppActions, selectUserData } from '@converted-pay/store/app';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'convertedin-update-profile',
  standalone: true,
  imports: [
    CommonModule,
    ControlErrorsModule,
    ReactiveFormsModule,
    InputTextModule,
    ProgressSpinnerModule,
    LogEventsDirective,
    PhoneNumberInputComponent,
    TranslateModule,
  ],
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  providers: [provideUserApi()],
})
export class UpdateProfileComponent implements OnInit {
  profileForm = new FormGroup({
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
      RxwebValidators.email({
        message: this.translate.instant('validations.email.mail'),
      }),
    ]),
    mobileNumber: new FormControl(),
  });
  isLoading$ = new BehaviorSubject(false);
  constructor(
    private userApi: UserApi,
    private store: Store,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getProfileData();
  }

  getProfileData() {
    this.store
      .select(selectUserData)
      .pipe(take(1))
      .subscribe((profile) => {
        const mobileNumber = {
          number: profile?.mobileNumber,
          countryCode: profile?.countryCode,
        };
        
        this.profileForm.patchValue({ ...profile, mobileNumber });
      });
  }
  submit() {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }
    const countryCode = this.profileForm.value.mobileNumber.countryCode;
    const mobileNumber = this.profileForm.value.mobileNumber.number;
    this.isLoading$.next(true);
    this.userApi
      .updateProfile({
        ...this.profileForm.value,
        mobileNumber,
        countryCode,
      } as ProfilePayload)
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.profileForm.markAsPristine();
        this.store.dispatch(AppActions.setUserData({ userData: res.data }));
      });
  }
}
