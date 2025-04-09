import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '@redmose/shared/components';
import { BillingApi, InvoiceInterface } from '@redmose/shared/api';
import { Observable, finalize } from 'rxjs';
import { TableModule } from 'primeng/table';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'convertedin-invoices',
  standalone: true,
  imports: [SpinnerComponent, TableModule, NgIf, NgClass, AsyncPipe,TranslateModule],
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss'],
})
export class InvoicesComponent implements OnInit {
  isLoading: boolean;
  invoices$!: Observable<{ data: InvoiceInterface[] }>;
  constructor(private __billingApi: BillingApi) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.invoices$ = this.__billingApi.getAllInvoices().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }
}
