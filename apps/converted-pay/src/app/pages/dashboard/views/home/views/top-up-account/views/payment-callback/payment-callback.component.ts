import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentFailureComponent } from '../payment-failure/payment-failure.component';
import { PaymentSuccessComponent } from '../payment-success/payment-success.component';

@Component({
  selector: 'convertedin-payment-callback',
  standalone: true,
  imports: [PaymentFailureComponent,PaymentSuccessComponent,NgIf],
  templateUrl: './payment-callback.component.html',
  styleUrls: ['./payment-callback.component.scss'],
})
export class PaymentCallbackComponent implements OnInit {
  status!:string
  constructor(private activeRoute: ActivatedRoute, private router: Router) {
    
  }
  ngOnInit(): void {
    this.status = this.activeRoute.snapshot.queryParams['success'];
    if(this.status !=='true'&& this.status !=='false')
      this.router.navigate(['/dashboard/home/topup-account']);
    // this.navigateTo(status);
  }

  // navigateTo(status: string) {
  //   switch (status) {
  //     case 'true':
  //       this.router.navigate(['/dashboard/home/topup-account/success']);
  //       break;
  //     case 'false':
  //       this.router.navigate(['/dashboard/home/topup-account/failure']);
  //       break;
  //     default:
  //       this.router.navigate(['/dashboard/home/topup-account']);
  //   }
  // }
}
