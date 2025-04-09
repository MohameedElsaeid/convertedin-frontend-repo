import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'convertedin-pricing',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss'],
})
export class PricingComponent {}
