import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BillingApi, QuotaInterface } from '@redmose/shared/api';
import { SpinnerComponent } from '@redmose/shared/components';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'convertedin-quotas',
  templateUrl: './quotas.component.html',
  styleUrls: ['./quotas.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DropdownModule,
    ButtonModule,
    FormsModule,
    SpinnerComponent,
    TranslateModule
  ],
})
export class QuotasComponent implements OnInit {
  smsQuotas$!: Observable<{ data: QuotaInterface[] }>;
  emailQuotas$!: Observable<{ data: QuotaInterface[] }>;

  isLoadingSMS: boolean;
  isLoadingEmail: boolean;

  selectedSmsQuota: QuotaInterface;
  selectedEmailQuota: QuotaInterface;

  @Output() addSMS: EventEmitter<QuotaInterface> =
    new EventEmitter<QuotaInterface>();
  @Output() addEmail: EventEmitter<QuotaInterface> =
    new EventEmitter<QuotaInterface>();

  constructor(private __billingApi: BillingApi) {
    this.isLoadingEmail = true;
    this.isLoadingSMS = true;
  }

  ngOnInit(): void {
    this.smsQuotas$ = this.__billingApi.getAllQuotas('sms').pipe(
      finalize(() => {
        this.isLoadingSMS = false;
      })
    );

    this.emailQuotas$ = this.__billingApi.getAllQuotas('email').pipe(
      finalize(() => {
        this.isLoadingEmail = false;
      })
    );
  }

  emitSMSQuota() {
    this.addSMS.emit(this.selectedSmsQuota);
  }

  emitEmailQuota() {
    this.addEmail.emit(this.selectedEmailQuota);
  }
}
