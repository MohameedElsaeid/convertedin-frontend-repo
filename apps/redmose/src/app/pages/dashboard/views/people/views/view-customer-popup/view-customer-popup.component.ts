import { AsyncPipe, DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerDetails, PeopleApi } from '@redmose/shared/api';
import { SpinnerComponent } from '@redmose/shared/components';
import { ApiResponse } from '@redmose/shared/models/interfaces';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'convertedin-view-customer-popup',
  templateUrl: './view-customer-popup.component.html',
  styleUrls: ['./view-customer-popup.component.scss'],
  standalone: true,
  imports: [
    TabViewModule,
    NgIf,
    AsyncPipe,
    SpinnerComponent,
    NgFor,
    DatePipe,
    DecimalPipe,
    TranslateModule,
  ],
})
export class ViewCustomerPopupComponent implements OnInit {
  customerDetails$!: Observable<ApiResponse<CustomerDetails>>;
  isLoading: boolean = true;

  constructor(
    private __peopleApi: PeopleApi,
    private __dialogData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.customerDetails$ = this.__peopleApi
      .getCustomerDetails(this.__dialogData.data['id'])
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      );
  }
}
