import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectCurrency } from '@converted-pay/store/app';

@Component({
  selector: 'convertedin-currency',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  host: {
    class: 'inline-block',
  },
})
export class CurrencyComponent {
  currency$ = this.store.select(selectCurrency);
  constructor(private store: Store) {}
}
