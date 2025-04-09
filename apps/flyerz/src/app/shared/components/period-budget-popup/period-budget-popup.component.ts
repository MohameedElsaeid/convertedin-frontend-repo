import { Component, OnInit } from '@angular/core';
import { periodBudgetPopupImports } from './imports';
import {
  Observable,
  catchError,
  finalize,
  map,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserData, selectValidations } from '@flyerz/store/app';
import {
  AdsApi,
  MatchAdSuggestions,
  UserData,
  Validations,
  provideAdsApi,
} from '@flyerz/shared/api';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAdActions, selectAdSuggestions } from '@flyerz/store/create-ad';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'convertedin-period-budget-popup',
  standalone: true,
  imports: periodBudgetPopupImports,
  templateUrl: './period-budget-popup.component.html',
  styleUrls: ['./period-budget-popup.component.scss'],
  providers: [provideAdsApi()],
})
export class PeriodBudgetPopupComponent implements OnInit {
  //#region Declerations
  userData$!: Observable<UserData | undefined>;
  validations$: Observable<Validations | undefined> =
    this.__store.select(selectValidations);
  adData$!: Observable<{ data: MatchAdSuggestions }>;
  form: FormGroup = this.__formBuilder.group({
    minimumBudget: [null, [], [this.budgetValidator()]],
    days: [null, [], [this.daysValidator()]],
  });
  hasData: boolean = false;
  isLoading: boolean = false;
  //#endregion

  constructor(
    private __store: Store,
    private __formBuilder: FormBuilder,
    private __dialog: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig,
    private __translate: TranslateService,
    private __adsApi: AdsApi,
    private __toast: MessageService
  ) {}

  ngOnInit(): void {
    this.userData$ = this.__store.select(selectUserData);
    this.setFormData();
  }

  //#region Methods
  closeDialog(): void {
    this.__dialog.close();
  }

  setFormData(): void {
    if (this.__dialogData.data?.renew['days']) {
      this.hasData = true;
      this.form.controls['minimumBudget'].setValue(
        this.__dialogData.data?.renew['budget']
      );
      this.form.controls['days'].setValue(
        this.__dialogData.data?.renew['days']
      );
    } else {
      this.getAdData();
    }
  }

  submitForm(): void {
    if (this.__dialogData.data?.renew['days']) {
      this.updateDuration();
    } else {
      this.__store.dispatch(
        CreateAdActions.updateAdBudgetAndDuration({
          budget: this.form.value.minimumBudget,
          duration: this.form.value.days,
        })
      );
      this.closeDialog();
    }
  }

  updateDuration(): void {
    this.isLoading = true;
    this.__adsApi
      .updateAdBudgetAndDuration(
        this.form.value.minimumBudget,
        this.form.value.days,
        this.__dialogData.data?.adId
      )
      .pipe(
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
        this.__dialogData.data?.onSuccess();
        this.closeDialog();
      });
  }

  getAdData(): void {
    this.adData$ = this.__store.select(selectAdSuggestions).pipe(
      tap(({ data }) => {
        this.form.patchValue({ ...data });
        this.form.controls['minimumBudget'].setValue(data.minimumBudget.amount);
      })
    );
  }

  daysValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.validations$.pipe(
        map((validations) => {
          const isValid =
            validations?.createAd.minDays &&
            control.value >= validations?.createAd.minDays;

          return control.dirty
            ? isValid
              ? null
              : {
                  invalid: {
                    message: `${this.__translate.instant('common.min-limit')} ${
                      validations?.createAd.minDays
                    } ${this.__translate.instant('common.days')}`,
                  },
                }
            : null;
        }),
        take(1)
      );
    };
  }

  budgetValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.validations$.pipe(
        map((validations) => {
          const isValid =
            validations?.createAd.minBudget &&
            control.value >= validations.createAd.minBudget;

          return control.dirty
            ? isValid
              ? null
              : {
                  invalid: {
                    message: `${this.__translate.instant('common.min-limit')} ${
                      validations?.createAd.minBudget
                    } ${validations?.currency?.symbol}`,
                  },
                }
            : null;
        }),
        take(1)
      );
    };
  }

  showPerDayErrorBanner(perDay: number): boolean {
    const minimumBudget = this.form.get('minimumBudget');
    const days = this.form.get('days');

    return minimumBudget?.value < days?.value * perDay;
  }
  //#endregion
}
