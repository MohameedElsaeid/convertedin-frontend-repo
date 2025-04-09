import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CampaignsQuery } from '../../shared/services/campaigns-query';
import { CreateCampaignForm } from '../../shared/services/create-campaign';
import { FormArray, FormGroup } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { setCampaignPlatformsFormValue } from '@redmose/store/actions/campaigns.action';
import { EditCampaignService } from '../../shared/services/edit-campaign.service';

@Component({
  selector: 'convertedin-campaign-platforms',
  templateUrl: './campaign-platforms.component.html',
  styleUrls: ['./campaign-platforms.component.scss'],
})
export class CampaignPlatformsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();

  private platforms:
    | {
        [p: string]: {
          id: number;
          name: string;
          type: string;
          enabled_for_user: boolean;
          logo: string;
        }[];
      }
    | any;
  private platformsGroup: {
    [p: string]: {
      id: number;
      name: string;
      type: string;
      enabled_for_user: boolean;
      logo: string;
    }[];
  };

  constructor(
    private store: Store<any>,
    private campaignQuery: CampaignsQuery,
    private createCampaignForm: CreateCampaignForm,
    private editCampaignService: EditCampaignService
  ) {}

  initForm() {
    this.form = this.createCampaignForm.createPlatformsForm(
      this.platformsGroup
    );
    this.streamValuesToStore();
    //todo remove this
    // this.store.dispatch(setCampaignPlatformsFormValue({
    //   payload: this.prepareDataForStore(this.items.value)
    // }))
  }

  prepareDataForStore(value): any {
    value = JSON.parse(JSON.stringify(value));
    let selectedPlatforms = value.flatMap((item) =>
      item.platforms.filter((platform) => platform.selected)
    );
    return {
      platforms: selectedPlatforms,
      isValid: selectedPlatforms.length > 0,
    };
  }

  streamValuesToStore() {
    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((changes) => {
        this.store.dispatch(
          setCampaignPlatformsFormValue({
            payload: this.prepareDataForStore(this.items.value),
          })
        );
      });
  }

  get items(): any {
    return this.form.get('items') as FormArray;
  }

  get controls(): any {
    return this.form ? this.form.controls : {};
  }

  fetchPlatforms() {
    this.campaignQuery.fetchPlatformsState().subscribe(
      (
        state: {
          id: number;
          name: string;
          type: string;
          enabled_for_user: boolean;
          logo: string;
        }[]
      ) => {
        this.platforms = JSON.parse(JSON.stringify(state));
        if(!this.editCampaignService.campaignFormsEditDispatchedMap.get('platforms')&& 
          this.editCampaignService.campaignEditMode)
        {
          //Stream Value to the store 
          this.editCampaignService.streamResponsePlatformsAsFormValue(JSON.parse(JSON.stringify(state)));
        }
        this.fetchSelectedObjectiveState();
      }
    );
  }

  fetchSelectedObjectiveState() {
    this.campaignQuery.fetchSelectedObjectiveState().subscribe((state: any) => {
      let data = JSON.parse(JSON.stringify(state));
      if (!this.platformsGroup) {
        const supportedPlatforms = data?.objective?.platforms;
        const selectedPlatforms = data?.platforms?.platforms;
        this.platforms = this.platforms.map((platform: any) => {
          const supportedPlatform = supportedPlatforms.find(
            (supportedPlatform: any) => supportedPlatform.id === platform.id
          );
          platform.enabled_for_user =
            supportedPlatform?.enabled_for_user || false; // let value to be boolean true if the platform is supported
          platform.active = !!supportedPlatform;
          platform.selected = selectedPlatforms
            ? !!selectedPlatforms.find(
                (selectedPlatform: any) => selectedPlatform.id === platform.id
              )
            : false;
          return platform;
        });
        this.platformsGroup = this.groupPlatformsByType(this.platforms);
        this.initForm();
      }
    });
  }

  groupPlatformsByType(platforms: any): {
    [key: string]: {
      id: number;
      name: string;
      type: string;
      enabled_for_user: boolean;
      logo: string;
      selected: boolean;
    }[];
  } {
    return platforms.reduce((acc: any, curr: any) => {
      const type = curr.type;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(curr);
      return acc;
    }, {});
  }

  ngOnInit(): void {
    this.fetchPlatforms();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
