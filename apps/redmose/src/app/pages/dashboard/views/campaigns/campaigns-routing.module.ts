import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsResolver } from './campaigns.resolver';

const routes: Routes = [
  {
    path : 'create',
    loadChildren: () => import('./create-campaign/create-campaign.module').then(m=>m.CreateCampaignModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./create-campaign/create-campaign.module').then(m=>m.CreateCampaignModule),
    resolve: {formData: CampaignsResolver}
  },
  { path: '', redirectTo: 'create', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignsRoutingModule { }
