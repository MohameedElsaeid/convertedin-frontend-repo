import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { NumberFormatterPipe } from '@pinads/shared/pipes/number-format.pipe';
import { CampaignDetails } from '@pinads/shared/api/campaign';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'convertedin-campaign-details-overview',
  standalone: true,
  imports: [CommonModule, TableModule, TranslateModule, NumberFormatterPipe],
  templateUrl: './campaign-details-overview.component.html',
  styleUrls: ['./campaign-details-overview.component.scss'],
})
export class CampaignDetailsOverviewComponent {
  readonly MICRO = 1_000_000;
  @Input() campaignDetails!: CampaignDetails;
  @Input() address!: string;
  @Input() contentData: Array<{ key: string; value: string }> = [];
}
