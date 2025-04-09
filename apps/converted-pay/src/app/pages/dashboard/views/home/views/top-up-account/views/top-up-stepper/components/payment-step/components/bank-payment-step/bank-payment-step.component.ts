import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BankAccount, PaymentsApi } from '@converted-pay/shared/api';
import { Observable, finalize, map, shareReplay } from 'rxjs';
import { ApiResponse } from '@converted-pay/shared/models/interfaces';
import { SpinnerComponent } from '@converted-pay/shared/components';
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'convertedin-bank-payment-step',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    SpinnerComponent,
    NgIf,
    AsyncPipe,
    NgFor,
    DropdownModule,
    TranslateModule
  ],
  templateUrl: './bank-payment-step.component.html',
  styleUrls: ['./bank-payment-step.component.scss'],
})
export class BankPaymentStepComponent implements OnInit {
  bankList$!: Observable<BankAccount[]>;
  isLoading = true;
  selectedBank!: BankAccount;
  @Output() onloadBankList = new EventEmitter<BankAccount[]>();
  constructor(private __paymentApi: PaymentsApi) {}

  ngOnInit(): void {
    this.bankList$ = this.__paymentApi.getRechargeBankTransfer().pipe(
      map((res) => {
        this.selectedBank = res.data[0];
        this.onloadBankList.emit(res.data);
        return res.data;
      }),
      finalize(() => {
        this.isLoading = false;
      }),
      shareReplay({ refCount: true })
    );
  }
}
