import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CurrentQuotaInterface } from '@redmose/shared/api';
import { ProgressBarModule } from 'primeng/progressbar';

@Component({
  selector: 'convertedin-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, ProgressBarModule, DatePipe, TranslateModule],
})
export class QuoteComponent implements OnInit {
  @Input() currentQuotas: CurrentQuotaInterface[] = [];
  @Input({ required: true }) mode: 'sms' | 'email' = 'sms';

  readonly unlimitedQuotaID : number = 28;

  currentDate = new Date();

  ngOnInit(): void {
    this.currentQuotas = this.currentQuotas.filter(
      (item) => item.feature === this.mode
    ).map(item =>
       {const isExpired = new Date(item.expires_at).getTime() < this.currentDate.getTime();
      return {...item, isExpired}});
  }
}
