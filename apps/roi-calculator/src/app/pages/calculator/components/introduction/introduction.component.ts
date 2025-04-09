import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';


@Component({
  selector: 'convertedin-introduction',
  standalone: true,
  imports: [CommonModule,TooltipModule],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
})
export class IntroductionComponent {
  cards = [
    { text: 'Monthly Ad Spend', tooltip: 'Your estimated average monthly spend on the selected advertising channel' },
    { text: 'CPM (Cost Per Mille)', tooltip: 'Your average campaign cost for 1,000 impressions' },
    { text: 'CTR (Click Through Rate)', tooltip: 'The ratio of average campaign clicks to impressions' },
    { text: 'CR (Conversion Rate)', tooltip: 'The percentage of campaign visitors who make a purchase' },
    { text: 'Campaign Ad Duration', tooltip: 'The length of time that your current campaign has been active' },
  ];
}