import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'convertedin-plan',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent {
  plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Up to $100 Ad Spend',
      fine_text: '',
      features: ['Facebook Ad Support', 'Instagram Ad Support', 'Segmentation', 'Setup Guidance'],
      monthly_allocations:['300 SMS Credits','1,000 Emails'],
    },
    {
      name: 'Starter',
      price: '119',
      description: 'Up to $1,200 Ad Spend',
      fine_text: 'Free Plan +',
      features: ['TikTok Ad Support','Google Static Search','RFM Segmentation','5,500 Contacts'],
      monthly_allocations:['1,800 SMS Credits','14,400 Emails'],
    },
    {
      name: 'Growth',
      price: '249',
      description: 'Up to $2,500 Ad Spend',
      fine_text: 'Starter Plan +',
      features: ['Snapchat Ad Support','Google P Max','20,000 Contacts'],
      monthly_allocations:['3,900 SMS Credits','Unlimited Emails','Ad Expert Session'],
    },    {
      name: 'Pro',
      price: '599',
      description: 'Up to $6,000 Ad Spend',
      fine_text: 'Growth Plan +',
      features: ['LinkedIn Ad Support','Google Dynamic Search + Standard Shopping','AdRoll Support','50,000 Contacts'],
      monthly_allocations:['Unlimited Emails','9,500 SMS Credits','2 Ad Expert Sessions'],
    }
  ];
}
