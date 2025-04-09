import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'convertedin-blank-campaign-details',
  standalone: true,
  imports: [CommonModule,InputTextModule,DividerModule],
  templateUrl: './blank-campaign-details.component.html',
  styleUrls: ['./blank-campaign-details.component.scss'],
})
export class BlankCampaignDetailsComponent {
  @HostBinding('class') class = 'flex flex-grow-1 flex-column py-2';
}
