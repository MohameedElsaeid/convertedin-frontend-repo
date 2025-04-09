import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'convertedin-pricing-card',
  standalone: true,
  imports: [CommonModule,SelectButtonModule,FormsModule],
  templateUrl: './pricing-card.component.html',
  styleUrls: ['./pricing-card.component.scss'],
})
export class PricingCardComponent {

  @Input() adSpent!: number;

  stateOptions: any[] = [{ label: 'Monthly', value: 'monthly' },{ label: 'Yearly', value: 'yearly' }];

  value = 'monthly';

  cardDetails = {
    plans_include: [
      'Social Media channels','Search Engine channels','DSP channels','Unlimited Emails','Tailored SMS Rates','Marketing Expert Support'
    ],
    managed_services: [
      'Performance Marketing','Ad/Campaign Strategy','Content Strategy','Creative SEO + CRO'
    ]
  }

  getMonthly(){
    return this.adSpent * 0.15;
  }

  getYearly(){
    return this.adSpent * 0.10;
  }
}
