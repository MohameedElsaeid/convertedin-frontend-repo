import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CampaignsApi} from './base/campaigns';
import {CampaignsService} from './services/campaigns.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers : [{
    provide : CampaignsApi,
    useClass : CampaignsService
  }]
})
export class CampaignsApiModule { }
