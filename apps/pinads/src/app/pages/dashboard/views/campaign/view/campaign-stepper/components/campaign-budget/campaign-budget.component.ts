import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { campaignBudgetImports } from './imports';
import { Store } from '@ngrx/store';
import {
  BudgetType,
  CampaignApi,
  SuggestionBudget,
  SuggestionBudgetObj,
  SuggestionPayload,
} from '@pinads/shared/api/campaign';
import { CampaignActions, campaignFeature } from '@pinads/store/campaign';
import {
  BehaviorSubject,
  Observable,
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { FormControl } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogService } from 'primeng/dynamicdialog';
import { BudgetBreakdown, BudgetBreakdownComponent } from './components';

@Component({
  selector: 'convertedin-campaign-budget',
  templateUrl: './campaign-budget.component.html',
  styleUrls: ['./campaign-budget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: campaignBudgetImports,
  providers: [DialogService],
})
export class CampaignBudgetComponent implements OnInit, OnDestroy {
  @Output() onchangeState = new EventEmitter<boolean>();

  readonly maxCustomBudget = 1400;
  readonly budgetOptions = {
    SELECT_BUDGET: 0,
    CUSTOM_BUDGET: 1,
  };

  selectedBudget!: BudgetType | null;
  suggestionsBudgets$!: Observable<SuggestionBudget>;
  isLoading$ = new BehaviorSubject(false);
  selectedOption = this.budgetOptions.SELECT_BUDGET;
  customBudgetControl = new FormControl<number | null>(
    { value: null, disabled: true },
    RxwebValidators.required({
      message: this.translate.instant('validations.required'),
    })
  );
  selectedSuggestionBudget!: SuggestionBudgetObj;
  recommendedBudget!: SuggestionBudgetObj;
  minCustomBudget = 0;
  serviceFees!: number;
  tax!: number;
  constructor(
    private store: Store,
    private campaignApi: CampaignApi,
    private translate: TranslateService,
    private destroyRef: DestroyRef,
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.subscribeFormState();
    this.getInitialState();
    this.getSuggestionsBudgets();
  }
  getInitialState() {
    this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(take(1))
      .subscribe((val) => {
        this.selectedBudget = val.budget?.type ?? null;
        this.selectedOption = val.is_custom_budget
          ? this.budgetOptions.CUSTOM_BUDGET
          : this.budgetOptions.SELECT_BUDGET;
        if (val.custom_budget) {
          this.customBudgetControl.enable();
          this.customBudgetControl.patchValue(val.custom_budget);
        }
      });
  }
  getSuggestionsBudgets() {
    this.isLoading$.next(true);
    this.suggestionsBudgets$ = this.store
      .select(campaignFeature.selectCampaignState)
      .pipe(
        take(1),
        switchMap((val) => {
          const suggestionPayload: SuggestionPayload = {
            proximity: {
              latitude_in_micro_degrees: 29957898.4,
              longitude_in_micro_degrees: 31275797.5,
              radius: 5,
              radius_units: 'KILOMETERS', // KILOMETERS,MILES
            },
            locations: val.locations!.map((item) => item.id),
            lang_code: val.lang_code!,
            profile_location_id: val.locations[0].id,
            keywords: val.keywords,
          };
          if (val.brandInfo.website_url)
            suggestionPayload.website_url = val.brandInfo.website_url;
          if (val.brandInfo.phone_number)
            suggestionPayload.phone_number = val.brandInfo.phone_number;
          return this.campaignApi
            .getSuggestionsBudgets(val.brand!.id, suggestionPayload)
            .pipe(
              finalize(() => {
                this.isLoading$.next(false);
              })
            );
        }),
        tap((res) => {
          res.data.profit_share;
          this.recommendedBudget = res.data.budgets.recommended;
          this.recommendedBudget.max_monthly_clicks;
          this.minCustomBudget = +res.data.budgets.recommended.monthly_amount;
          this.serviceFees = +res.data.monthly_fees;
          this.tax = +res.data.profit_share;
          this.customBudgetControl.patchValue(this.minCustomBudget);
          this.updateCustomBudgetValidation();
        }),
        map((res) => res.data.budgets)
      );
  }
  updateCustomBudgetValidation() {
    this.customBudgetControl.addValidators([
      RxwebValidators.minNumber({ value: this.minCustomBudget - 1 }),
      RxwebValidators.maxNumber({ value: this.maxCustomBudget }),
    ]);
  }
  onChangeBudget(type: BudgetType, budget: SuggestionBudgetObj) {
    this.selectedSuggestionBudget = { ...budget, type };
    // this.store.dispatch(
    //   CampaignActions.setBudget({ budget: { ...budget, type } })
    // );
    this.selectedBudget = type;
    this.checkSelectedBudget();
  }
  showBreakdown(data: BudgetBreakdown) {
    this.dialog.open(BudgetBreakdownComponent, {
      showHeader: false,
      data,
    });
  }
  checkSelectedBudget() {
    if (this.selectedBudget) {
      this.onchangeState.emit(true);
    } else {
      this.onchangeState.emit(false);
    }
  }
  onchangeBudgetOption() {
    if (this.selectedOption === this.budgetOptions.CUSTOM_BUDGET) {
      this.customBudgetControl.enable();
      return;
    }
    this.customBudgetControl.disable();
  }
  subscribeFormState() {
    this.customBudgetControl.statusChanges
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((status) => {
        switch (status) {
          case 'INVALID':
            this.onchangeState.emit(false);
            break;
          case 'VALID':
            this.onchangeState.emit(true);
            break;
          default:
            this.checkSelectedBudget();
            break;
        }
      });
  }
  ngOnDestroy(): void {
    if (this.selectedOption === this.budgetOptions.CUSTOM_BUDGET) {
      this.store.dispatch(
        CampaignActions.setCustomBudget({
          custom_budget: this.customBudgetControl.value!,
        })
      );
    } else {
      this.store.dispatch(
        CampaignActions.setBudget({ budget: this.selectedSuggestionBudget })
      );
    }
  }
}
