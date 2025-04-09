import { Component, OnInit } from '@angular/core';
import { previewAndPubishImports } from './imports';
import { Store } from '@ngrx/store';
import { campaignFeature } from '@pinads/store/campaign';
import { CampaignApi, WorkingHour } from '@pinads/shared/api/campaign';
import { Observable, map, switchMap, take } from 'rxjs';

@Component({
  selector: 'convertedin-preview-and-publish',
  templateUrl: './preview-and-publish.component.html',
  styleUrls: ['./preview-and-publish.component.scss'],
  standalone: true,
  imports: previewAndPubishImports,
})
export class PreviewAndPublishComponent implements OnInit {
  campaignState$ = this.store.select(campaignFeature.selectCampaignState);
  workingHours$!: Observable<WorkingHour[]>;
  constructor(private store: Store, private campaignApi: CampaignApi) {}
  ngOnInit(): void {
    this.workingHours$ = this.store
      .select(campaignFeature.selectBrand)
      .pipe(
        take(1),
        switchMap((brand) =>
          this.campaignApi
            .getWorkingHours(brand!.id)
            .pipe(map((res) => res.data))
        )
      );
  }
}
