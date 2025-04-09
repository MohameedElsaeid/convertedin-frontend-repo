import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateCampaignService } from '../../shared/services/create-campaign.service';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { setCampaignSettingsFormValue } from '@redmose/store/actions/campaigns.action';

@Component({
  selector: 'convertedin-campaign-settings',
  templateUrl: './campaign-settings.component.html',
  styleUrls: ['./campaign-settings.component.scss'],
})
export class CampaignSettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private createCampaignService: CreateCampaignService,
    private store: Store<any>
  ) {}

  get controls(): any {
    return this.form.controls;
  }

  fetchCampaignState() {
    this.store
      .select('campaigns')
      .pipe(takeUntil(this.destroy$))
      .subscribe((state) => {
        if (!state?.forms?.settings) {
          this.initForm({});
        } else {
          this.initForm(JSON.parse(JSON.stringify(state.forms.settings)));
        }
      });
  }

  initForm(value: any) {
    this.form = this.createCampaignService.createSettingsForm(value);
    console.log(this.form.value);
    this.streamValuesToStore();
  }

  ngOnInit() {
    this.fetchCampaignState();
  }

  streamValuesToStore() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes) => {
        this.store.dispatch(
          setCampaignSettingsFormValue({
            payload: {
              ...JSON.parse(JSON.stringify(this.form.value)),
              isValid: JSON.parse(JSON.stringify(this.form.valid)),
            },
          })
        );
      });
  }

  selectType(type: string) {
    if (type === 'template'){
      return
    }
    this.form.patchValue({
      type: type,
    });
  }

  selectSettings(type: string) {
    console.log(type);
    if (type === 'dynamic'){
      return
    }
    this.form.patchValue({
      settings: type,
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
