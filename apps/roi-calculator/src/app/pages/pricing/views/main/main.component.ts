import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PricingCardComponent,
  SliderComponent,
  SupportCardComponent,
} from './components';
import { PlansComponent } from './components/plans/plans.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'convertedin-main',
  standalone: true,
  imports: [
    CommonModule,
    SliderComponent,
    PlansComponent,
    SupportCardComponent,
    PricingCardComponent,
    RouterLink
  ],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  sections = {
    PLANS: 0,
    PRICING_1: 1,
    PRICING_2: 2,
    PRICING_3: 3,
    SUPPORT: 4,
  };
  activeSection = this.sections.PLANS;

  sliderValue = 0;
  adSpentValue = 3000;

  supportedChannels = [
    {
      title: 'Social Media',
      channels: ['Facebook & Instagram', 'TikTok', 'Snapchat', 'LinkedIn'],
    },
    {
      title: 'Search Engine',
      channels: [
        'Google Static Search',
        'Google Dynamic Search',
        'Google P Max',
      ],
    },
    {
      title: 'Other Advertising',
      channels: ['Amazon DSP', 'Criteo', 'AdRoll'],
    },
    {
      title: 'Direct Messaging',
      channels: ['Email', 'SMS', 'Push Notifications'],
    },
  ];

  onSliderChange(step: number) {
    this.activeSection = step;
    this.updateAdSpent();
    
  }
  updateAdSpent() {
    switch (this.activeSection) {
      case this.sections.PRICING_1:
        this.adSpentValue = 20000;
        break;
      case this.sections.PRICING_2:
        this.adSpentValue = 50000;
        break;
      case this.sections.PRICING_3:
        this.adSpentValue = 80000;
        break;
    }
  }

  showPricing() {
    return this.sliderValue === 0;
  }
}
