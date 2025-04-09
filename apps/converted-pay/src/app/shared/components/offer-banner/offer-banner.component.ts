import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { selectCurrency } from '@converted-pay/store/app';
import { Store } from '@ngrx/store';

@Component({
  selector: 'convertedin-offer-banner',
  standalone: true,
  imports: [CommonModule,RouterLink,TranslateModule],
  templateUrl: './offer-banner.component.html',
  styleUrls: ['./offer-banner.component.scss'],
})
export class OfferBannerComponent {
  currency$ = this.store.select(selectCurrency);

  constructor(private store: Store) {}
}
