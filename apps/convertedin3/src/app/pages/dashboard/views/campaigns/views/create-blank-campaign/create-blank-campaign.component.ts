import { Component, HostBinding } from '@angular/core';
import { CreateBlankCampaignService } from '../../shared/services/create-blank-campaign.service';
import { createBlankCampaignsImports } from './imports';

@Component({
  selector: 'convertedin-create-blank-campaign',
  standalone: true,
  imports: [createBlankCampaignsImports],
  templateUrl: './create-blank-campaign.component.html',
  styleUrls: ['./create-blank-campaign.component.scss'],
})
export class CreateBlankCampaignComponent {
  @HostBinding('class') class = 'flex flex-grow-1 flex-column';

  activeIndex = 1;

  constructor(private createBlankCampaignService:CreateBlankCampaignService){

  }

  onActiveIndexChange(event:number) {
    this.activeIndex = event;
  }
}
