
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { BlankCampaignDetailsComponent } from './components/blank-campaign-details/blank-campaign-details.component';
import { BlankCampaignTargitingComponent } from './components/blank-campaign-targiting/blank-campaign-targiting.component';
import { BlankCampaignAdCreativeComponent } from './components/blank-campaign-ad-creative/blank-campaign-ad-creative.component';


export const createBlankCampaignsImports = [
    CommonModule,
    ButtonModule,
    DividerModule,
    BlankCampaignDetailsComponent,
    BlankCampaignTargitingComponent,
    BlankCampaignAdCreativeComponent
]
