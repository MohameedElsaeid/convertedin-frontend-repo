import { Component, OnDestroy } from '@angular/core';
import { CreateCampaignForm } from '../../shared/services/create-campaign';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { CampaignsQuery } from '../../shared/services/campaigns-query';
import { setCampaignObjectiveFormValue } from '@redmose/store/actions/campaigns.action';
import { EditCampaignService } from '../../shared/services/edit-campaign.service';

@Component({
  selector: 'convertedin-campaign-obejctive',
  templateUrl: './campaign-objective.component.html',
  styleUrls: ['./campaign-objective.component.scss'],
})
export class CampaignObjectiveComponent implements OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  objectiveList: any;

  constructor(
    private createCampaignForm: CreateCampaignForm,
    private store: Store<any>,
    private campaignQuery: CampaignsQuery,
    private editCampaignService:EditCampaignService
  ) {
    this.campaignQuery.fetchObjectivesState().subscribe((state) => {
      if (!this.objectiveList && state) {
        this.objectiveList = JSON.parse(JSON.stringify(state));
        this.fetchCampaignState();
      }
    });
  }

  get controls(): any {
    return this.form.controls;
  }

  streamValuesToStore() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes) => {
        this.store.dispatch(
          setCampaignObjectiveFormValue({
            payload: {
              ...JSON.parse(JSON.stringify(this.controls.objective.value)),
              isValid: JSON.parse(
                JSON.stringify(this.controls.objective.valid)
              ),
            },
          })
        );
      });
  }

  initForm(value: any) {
    this.form = this.createCampaignForm.createObjectiveForm(value);
    this.streamValuesToStore();
  }

  updateForm(item: any) {
    this.form.patchValue({
      objective: item,
    });
  }

  fetchCampaignState() {
    this.store
      .select('campaigns')
      .pipe(
        tap(()=>{
          if(!this.editCampaignService.campaignFormsEditDispatchedMap.get('objective')&& 
            this.editCampaignService.campaignEditMode)
          {
            //Stream Value to the store 
            this.editCampaignService.streamResponseObjectiveAsFormValue(this.objectiveList);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe((state) => {
        if(!state?.forms?.objective && !this.editCampaignService.campaignEditMode) {
          this.initForm({});
          //to do check this
          this.updateForm(this.objectiveList[1]);
        } else {
          this.initForm(JSON.parse(JSON.stringify(state.forms)));
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
