import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'convertedin-campaign-summary',
  templateUrl: './campaign-summary.component.html',
  styleUrls: ['./campaign-summary.component.scss'],
})
export class CampaignSummaryComponent {
  campaignState: any;

  constructor(private store: Store<any>) {
    this.store.select('campaigns').subscribe(state => {
      this.campaignState = state;
    });
  }

}
