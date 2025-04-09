import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { TranslateModule } from '@ngx-translate/core';
import { selectCurrency, selectUserData } from '@converted-pay/store/app';
import { Store } from '@ngrx/store';

@Component({
  selector: 'convertedin-referral-how-it-works',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, TranslateModule],
  templateUrl: './referral-how-it-works.component.html',
  styleUrls: ['./referral-how-it-works.component.scss'],
})
export class ReferralHowItWorksComponent {
  userData$ = this.store.select(selectUserData);

  constructor(private store: Store) {}
}
