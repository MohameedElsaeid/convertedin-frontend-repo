import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateCampaignComponent} from './create-campaign.component';

const routes: Routes = [{
  path : '',
  component : CreateCampaignComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateCampaignRoutingModule { }
