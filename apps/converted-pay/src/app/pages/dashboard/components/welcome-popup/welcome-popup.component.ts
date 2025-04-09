import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AuthApi, CompleteRegisterPayload } from '@converted-pay/shared/api';
import { ControlErrorsModule } from '@convertedin/ui';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, finalize } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppActions } from '@converted-pay/store/app';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-welcome-popup',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    ControlErrorsModule,
    TranslateModule,
  ],
  templateUrl: './welcome-popup.component.html',
  styleUrls: ['./welcome-popup.component.scss'],
})
export class WelcomePopupComponent {
  startOptions = [
    'As soon as possible',
    'Need this budget for the coming month',
    '⁠Need this budget for the coming quarter',
  ];
  describeList = ['Direct advertiser', 'Digital media agency'];
  completeRegisterForm = new FormGroup({
    advertiserType: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.required'),
      }),
    ]),
    facebookUrlPage: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.required'),
      }),
    ]),
    whenToStart: new FormControl('', [
      RxwebValidators.required({
        message: this.translate.instant('validations.required'),
      }),
    ]),
  });
  isLoading$ = new BehaviorSubject(false);

  constructor(
    private authApi: AuthApi,
    private dialogRef: DynamicDialogRef,
    private store: Store,
    private translate: TranslateService
  ) {}
  submit() {
    if (this.completeRegisterForm.invalid) {
      this.completeRegisterForm.markAllAsTouched();
      return;
    }

    this.isLoading$.next(true);
    this.authApi
      .completeRegister(
        this.completeRegisterForm.value as CompleteRegisterPayload
      )
      .pipe(
        finalize(() => {
          this.isLoading$.next(false);
        })
      )
      .subscribe((res) => {
        this.store.dispatch(AppActions.setUserData({ userData: res.data }));
        this.dialogRef.close();
      });
  }
}
