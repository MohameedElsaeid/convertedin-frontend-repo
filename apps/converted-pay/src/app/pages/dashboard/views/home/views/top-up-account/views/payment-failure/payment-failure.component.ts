import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-payment-failure',
  standalone: true,
  imports: [CommonModule,RouterLink,TranslateModule],
  templateUrl: './payment-failure.component.html',
  styleUrls: ['./payment-failure.component.scss'],
})
export class PaymentFailureComponent {}
