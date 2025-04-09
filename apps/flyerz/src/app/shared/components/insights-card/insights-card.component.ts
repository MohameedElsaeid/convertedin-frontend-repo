import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { selectCurrency } from '@flyerz/store/app';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'convertedin-insights-card',
  templateUrl: './insights-card.component.html',
  styleUrls: ['./insights-card.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class InsightsCardComponent implements OnInit {
  @HostBinding('class') class = 'flyerz__insight flex flex-column gap-3';
  @HostBinding('class.cursor-pointer') get className() {
    return this.isClickable;
  }
  @Input({ required: true }) title!: string;
  @Input() value: number | string = 0;
  @Input() img!: string;
  @Input() showCurrency: boolean = false;
  @Input() isClickable: boolean = false;
  _currency$!: Observable<string | undefined>;

  get direction() {
    return document.documentElement.dir;
  }

  constructor(private __store: Store) {}

  ngOnInit(): void {
    this._currency$ = this.__store.select(selectCurrency);
  }
}
