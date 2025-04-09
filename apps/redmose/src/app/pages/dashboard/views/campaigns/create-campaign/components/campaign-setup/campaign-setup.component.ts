import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreateCampaignService } from '../../shared/services/create-campaign.service';
import { Store } from '@ngrx/store';
import { FormControl, FormGroup } from '@angular/forms';
import { CampaignsQuery } from '../../shared/services/campaigns-query';
import { prop, RxwebValidators, toDouble } from '@rxweb/reactive-form-validators';
import { Subject, takeUntil } from 'rxjs';
import {
  setCampaignBudgetFormValue,
  setCampaignSetupFormValue,
} from '@redmose/store/actions/campaigns.action';
import { EditCampaignService } from '../../shared/services/edit-campaign.service';

@Component({
  selector: 'convertedin-campaign-setup',
  templateUrl: './campaign-setup.component.html',
  styleUrls: ['./campaign-setup.component.scss'],
})
export class CampaignSetupComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  selectedCountry: string | undefined;
  campaignState: any;
  form: FormGroup;
  staticData: any;
  formSubmitted: any;
  today = new Date();
  @prop()
  @toDouble()
  budget: number;
  endDateMin: any;

  constructor(
    private createCampaignService: CreateCampaignService,
    private store: Store<any>,
    private campaignQuery: CampaignsQuery,
    private editCampaignService: EditCampaignService
  ) {
    this.store.select('configuration').pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.staticData = state.staticData;
      if(!this.editCampaignService.campaignFormsEditDispatchedMap.get('setup')&& 
      this.editCampaignService.campaignEditMode)
      {
        //Stream Value to the store 
        this.editCampaignService.streamResponseSetupAsFormValue();
      }
      this.checkIfAllDataIsLoaded();
    });
    this.store.select('campaigns').pipe(takeUntil(this.destroy$)).subscribe((state) => {
      this.campaignState = state;
      this.formSubmitted = this.campaignState?.forms?.setup?.submitted;
    });
    // if (!this.staticData?.events) {
    //   this.campaignQuery.toggleLoader(true);
    // }
  }
  get showConversion() {
    //in case of lead generation or get calls objective we should not show the conversion event field
    return (
      this.campaignState?.forms?.objective?.id !== 5 &&
      this.campaignState?.forms?.objective?.id !== 6
    );
  }
  checkIfAllDataIsLoaded() {
    if (this.staticData?.events) {
      this.campaignQuery.toggleLoader(false);
    }
  }

  get getAllErrors() {
    return this.createCampaignService.getAllErrors(this.form);
  }

  streamValuesToStore() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes) => {
        this.createCampaignService.cbo = changes.budget.cbo;
        setTimeout(() => {
          if (this.campaignState.forms.budget.value !== changes.budget.value) {
            this.store.dispatch(
              setCampaignBudgetFormValue({
                payload: {
                  ...this.campaignState.forms.budget,
                  value: changes.budget.value,
                },
              })
            );
          }
          this.store.dispatch(
            setCampaignSetupFormValue({
              payload: {
                ...this.form.value,
                isValid: this.form.valid,
              },
            })
          );
        }, 100);
      });
  }

  initForm() {
    this.form = this.createCampaignService.createSetupForm(
      this.campaignState?.forms?.setup || {},
      this.campaignState?.forms?.objective?.id
    );
    this.endDateMin = new Date();
    this.streamValuesToStore();
    this.budgeTypeOnChange();

  }

  get controls(): any {
    return this.form.controls;
  }

  ngOnInit() {
    this.initForm();
  }

  submit() {
    this.formSubmitted = true;
    console.log(this.form.valid);
    // console.log(this.createCampaignService.getAllErrors(this.form));
    // if (this.form.valid) {
    //   this.store.dispatch({type: '[Campaigns] Set Campaign Setup Form Value', payload: this.form.value});
    //   this.store.dispatch({type: '[Campaigns] Set Campaign Setup Form Valid', payload: this.form.valid});
    // }
  }

  validateStartEndDates() {
    // this.status = false
    const startDate = this.controls.schedule.get('start')?.value;
    const endDate = this.controls.schedule.get('end')?.value;
    this.endDateMin = startDate;
    if (startDate && endDate) {
      if (startDate > endDate) {
        console.log('if', startDate, endDate);
        this.controls.schedule.patchValue({ end: null });
      } else {
        console.log('else', startDate, endDate);
      }
    }

    // return true;
  }

  syncEndDateControl(budget) {
    const endDateControl =  (this.controls.schedule.get('end') as FormControl)
    endDateControl.clearValidators();
    endDateControl.addValidators([
      RxwebValidators.required({
        message: 'end date is required',
        conditionalExpression: (x) => x.lifetime === false && this?.createCampaignService?.cbo === true && budget === 'lifetime',
      }),
    ])
    endDateControl.updateValueAndValidity();
  }
  budgeTypeOnChange(): void {
    (this.controls.budget.get('type') as FormControl).valueChanges.pipe(
    takeUntil(this.destroy$))
    .subscribe(res=>{
      if(res === 'lifetime' && this.controls.schedule.value.lifetime) {
        this.controls.schedule.get('lifetime').setValue(false);
      }
      this.syncEndDateControl(res);
      this.store.dispatch(
        setCampaignBudgetFormValue({
          payload: { ...this.campaignState.forms.budget, type: res },
        })
      );
    })
  }

  budgetCboOnChange() {
    (this.controls.budget.get('cbo') as FormControl).valueChanges.pipe(
    takeUntil(this.destroy$))
    .subscribe(res=>{
      this.createCampaignService.cbo = res;
      this.syncEndDateControl(this.controls.budget.get('type').value);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();    
  }

}
