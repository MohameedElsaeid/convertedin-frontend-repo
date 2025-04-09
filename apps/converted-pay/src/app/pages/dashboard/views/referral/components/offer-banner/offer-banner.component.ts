import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { selectUserData } from '@converted-pay/store/app';
import { Store } from '@ngrx/store';

@Component({
  selector: 'convertedin-offer-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './offer-banner.component.html',
  styleUrls: ['./offer-banner.component.scss'],
})
export class OfferBannerComponent {
  userData$ = this.store.select(selectUserData);

  constructor(private store: Store) {}
}
