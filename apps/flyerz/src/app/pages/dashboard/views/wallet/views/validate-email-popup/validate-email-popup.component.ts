import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ControlErrorsModule } from '@convertedin/ui';
import { AuthApi } from '@flyerz/shared/api';
import { Subject, catchError, finalize, takeUntil, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { AppActions } from '@flyerz/store/app';

@Component({
  selector: 'convertedin-validate-email-popup',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ControlErrorsModule,
  ],
  templateUrl: './validate-email-popup.component.html',
  styleUrls: ['./validate-email-popup.component.scss'],
})
export class ValidateEmailPopupComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-5';
  private __unsubscriber: Subject<void> = new Subject();
  isLoading: boolean = false;
  form: FormGroup = this.__formBuilder.group({
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
        RxwebValidators.required({
          message: this.__translate.instant('common-form-validations.required'),
        }),
      ],
    ],
  });
  //#endregion

  constructor(
    private __dialogRef: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig,
    private __formBuilder: FormBuilder,
    private __translate: TranslateService,
    private __authApi: AuthApi,
    private __dialog: DialogService,
    private __toast: MessageService,
    private __store: Store
  ) {}

  ngOnInit(): void {
    this.form.controls['email'].setValue(this.__dialogData.data.email);
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  closeDialog(): void {
    this.__dialogRef.close();
  }

  submit(): void {
    this.isLoading = true;
    this.__authApi
      .verifyEmail(this.form.value.email)
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          this.isLoading = false;
        }),
        catchError((error: HttpErrorResponse) => {
          this.__toast.add({
            summary: error.error?.message,
            severity: 'error',
          });
          return throwError(() => error);
        })
      )
      .subscribe(() => {
        this.openSuccessDialog();
        this.__store.dispatch(
          AppActions.updateUserEmail({ email: this.form.value.email })
        );
        this.closeDialog();
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
  //#endregion
}
