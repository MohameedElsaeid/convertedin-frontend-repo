import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'convertedin-support-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './support-card.component.html',
  styleUrls: ['./support-card.component.scss'],
})
export class SupportCardComponent {
  cardDetails = {
    plans_include: [
      'Social Media channels','Search Engine channels','DSP channels','Unlimited Emails','Tailored SMS Rates','Marketing Expert Support'
    ],
    managed_services: [
      'Performance Marketing','Ad/Campaign Strategy','Content Strategy','Creative SEO + CRO'
    ]
  }
}
