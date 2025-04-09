import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'convertedin-campaign-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './campaign-payment.component.html',
  styleUrls: ['./campaign-payment.component.scss'],
})
export class CampaignPaymentComponent implements OnInit {
  paymentStatus!: string;

  constructor(private activeRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const status = this.activeRoute.snapshot.queryParams['status'];
    this.navigateTo(status);
  }
  navigateTo(status: string) {
    switch (status) {
      case 'success':
        this.router.navigate(['/dashboard/campaign/publish']);
        break;
      case 'failure':
        this.router.navigate(['/dashboard/campaign/failed']);
        break;
      default:
        this.router.navigate(['/dashboard/campaign']);
    }
  }
}
