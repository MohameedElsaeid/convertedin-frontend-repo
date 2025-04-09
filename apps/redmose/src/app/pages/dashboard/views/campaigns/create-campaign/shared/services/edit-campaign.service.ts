import { Injectable } from '@angular/core';
import { QueryApi } from '@convertedin/api';
import { Store } from '@ngrx/store';
import { setCampaignObjectiveFormValue, setCampaignPlatformsFormValue, setCampaignSetupFormValue } from '@redmose/store/actions/campaigns.action';
import { Endpoints } from 'libs/api/src/lib/constants/endpoints';
import { map, Observable, tap } from 'rxjs';
export type FormsReducerType = 'objective' | 'platforms' | 'settings' | 'setup' | 'budget';
@Injectable({
  providedIn: 'root',
})

export class EditCampaignService {
  campaignFormsEditDispatchedMap:Map<FormsReducerType,boolean> = new Map<FormsReducerType,boolean>([
    ['objective', false],
    ['platforms',false],
    ['settings',false],
    ['setup', false],
    ['budget', false],
  ]);

  campaignResponseData:any;
  campaignEditMode:boolean;
  constructor(private queryApi:QueryApi,private store:Store) {}

  fetchCampaingById(id:any): Observable<any> {
    return this.queryApi.get(`${Endpoints.CAMPAIGN_BY_ID(id)}`).pipe(tap(res=>this.campaignResponseData = res.data));
  }

  streamResponseObjectiveAsFormValue(objectiveList) {
    const objectiveValue = objectiveList?.find(objective => objective?.id == this.campaignResponseData.objective);
    const objectiveObject = objectiveValue ? objectiveValue : objectiveList[1];    
    if(objectiveObject) {
      this.store.dispatch(
        setCampaignObjectiveFormValue({
          payload: {
            ...JSON.parse(JSON.stringify(objectiveObject)),
            isValid: true
          },
        })
      );
    }
    //Set the gate checker to true
    this.campaignFormsEditDispatchedMap.set('objective',true);
  }

  streamResponsePlatformsAsFormValue(platforms) {
    const platformValue = [...platforms?.filter(platform=> this.campaignResponseData.platforms.includes(platform.id))
      .map(platform=> {return {
        ...platform,
        selected:true
      }})
    ];
    if(platformValue.length > 0) {
      if(platformValue) {
        this.store.dispatch(
          setCampaignPlatformsFormValue({
            payload: {
              platforms: [...JSON.parse(JSON.stringify(platformValue))],
              isValid: true
            },
          })
        );
      }
    }
    //Set the gate checker to true
    this.campaignFormsEditDispatchedMap.set('platforms',true);
  }

  streamResponseSetupAsFormValue() {
    const setupFormValue = {
      name: this.campaignResponseData.campaign.name,
      schedule: this.campaignResponseData.campaign.name,
      budget: {
        cbo: this.campaignResponseData?.campaign?.budget?.cbo,
        value: this.campaignResponseData?.campaign?.budget?.value,
        bid_amount: this.campaignResponseData?.campaign?.budget?.bid_amount,
        bid_strategy: this.campaignResponseData?.campaign?.budget?.bid_strategy,
      }
    }
    this.store.dispatch(
      setCampaignSetupFormValue({
        payload: {
          ...setupFormValue,
          isValid: true,
          submitted:true
        },
      })
    );
    //Set the gate checker to true
    this.campaignFormsEditDispatchedMap.set('setup',true);
  }

}