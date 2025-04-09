import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { setAllFormValue } from '@redmose/store/actions/campaigns.action';
import { EditCampaignService } from './create-campaign/shared/services/edit-campaign.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignsResolver implements Resolve<any> {
  constructor(private store: Store<any>,private editCampaignService:EditCampaignService) {}

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<any> {
    const campaingId = route.paramMap.get('id');
    this.editCampaignService.campaignEditMode = !!campaingId;
    return this.editCampaignService.fetchCampaingById(campaingId).pipe(
      switchMap((formData) => of(formData)),
      catchError((error) => of(null))
    );
  }
}
