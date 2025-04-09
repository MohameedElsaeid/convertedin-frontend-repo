import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Subscription} from "rxjs";

@Component({
  selector: 'convertedin-campaign-configuration-info',
  templateUrl: './campaign-configuration-info.component.html',
  styleUrls: ['./campaign-configuration-info.component.scss'],
})
export class CampaignConfigurationInfoComponent implements OnInit, OnDestroy {
  data: any
  private campaignsSubscriptions$: Subscription;


  constructor(private store: Store<any>) {
  }

  ngOnInit() {
    this.campaignsSubscriptions$ = this.store.select('campaigns').subscribe(res => {
      this.data = res?.forms?.objective;
    })
  }

  ngOnDestroy() {
    this.campaignsSubscriptions$.unsubscribe()
  }
}

