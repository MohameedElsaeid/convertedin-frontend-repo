import { Component, HostBinding, OnInit } from '@angular/core';
import { segmentCustomerImports } from './imports';
import { Observable, finalize, tap } from 'rxjs';
import { Customer, Customers, PeopleApi, Source, User } from '@redmose/shared/api';
import { PaginationService } from '@redmose/shared/services';
import { TableSort } from '@redmose/shared/models/interfaces';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { selectUserData } from '@redmose/store/app';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-people-all-customers',
  standalone: true,
  imports: segmentCustomerImports,
  templateUrl: './people-all-customers.component.html',
  styleUrls: ['./people-all-customers.component.scss'],
  providers: [PaginationService, DialogService],
})
export class PeopleAllCustomersComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-4 flex-grow-1';
  userData$!: Observable<User | undefined>;
  isLoading: boolean = false;
  initialLoad: boolean = true;
  customers$!: Observable<Customers>;
  customers: Customer[] | undefined = undefined;
  search: string = '';
  sort!: TableSort;
  state!: 'pending' | 'uploaded' | 'failed';
  showImportCsv: boolean = true;
  get dir() {
    return document.documentElement.dir;
  }
  createSegmentRoute: string = '/dashboard/segments/build';
  columns: { label: string; field: string }[] = [
    {
      label: this.__translate.instant('Customer Name'),
      field: 'first_name',
    },
    {
      label: this.__translate.instant('Email'),
      field: 'email',
    },
    {
      label: this.__translate.instant('customers.Valid Email'),
      field: 'valid_email',
    },
    {
      label: this.__translate.instant('customers.Accept Email Marketing'),
      field: 'accept_email_marketing',
    },
    {
      label: this.__translate.instant('Phone'),
      field: 'phone',
    },
    {
      label: this.__translate.instant('customers.Valid Phone'),
      field: 'valid_phone',
    },
    {
      label: this.__translate.instant('customers.Accept SMS Marketing'),
      field: 'accept_sms_marketing',
    },
    {
      label: this.__translate.instant('Orders'),
      field: 'orders_count',
    },
    {
      label: this.__translate.instant('customers.Total Spent'),
      field: 'total_spent',
    },
  ];
  selectedColumns: { label: string; field: string }[] = [];
  sourceOptions: Source[] = [];
  selectedSource: string = '';
  //#endregion

  constructor(
    private __peopleApi: PeopleApi,
    private __toast: MessageService,
    private __store: Store,
    private __translate: TranslateService,
    private __dialog: DialogService,
    protected paginationService: PaginationService
  ) {}

  ngOnInit(): void {
    this.getCustomers();
    this.userData$ = this.__store.select(selectUserData);
    this.selectedColumns = this.columns;
    this.getAllSources();
  }

  //#region Methods
  searchChange(): void {
    this.isLoading = true;
    this.paginationService.resetPaginations();
    this.getCustomers();
  }

  getCustomers(): void {
    this.customers$ = this.__peopleApi
      .getCustomers(
        this.search,
        this.paginationService.pagination?.meta.per_page,
        this.paginationService.pagination?.meta.current_page,
        this.sort,
        undefined,
        this.selectedSource

      )
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
        tap((data) => {
          this.paginationService.updatePagination(data);
          this.customers = data.data;
          this.showImportCsv =
            data.customers_sheet.userHasAccessToImportCustomersSheet;
          if (data.customers_sheet?.status === 'pending') {
            this.__toast.add({
              summary: this.__translate.instant('customers.pending-upload'),
              detail: this.__translate.instant('customers.upload-toast'),
              severity: 'info',
              key: 'cin-toast',
            });
          }
        })
      );
  }

  resetView(): void {
    this.initialLoad = true;
    this.customers = undefined;
    this.getCustomers();
  }

  getName(customer: Customer): string {
    return `${customer.first_name || ''} ${customer.last_name || ''}`;
  }

  tableLazyLoad(event: any): void {
    if (this.customers && !this.initialLoad) {
      this.isLoading = true;
      event.sortField &&
        (this.sort = {
          key: event.sortField,
          sortMode: event.sortOrder === 1 ? 'desc' : 'asc',
        });
      this.paginationService.paginationChange(event, () => {
        this.getCustomers();
      });
    }
    this.initialLoad = false;
  }

  getMarketingStatus(value: 1 | 0 | null): string {
    let status = '';

    switch (value) {
      case 1:
        status = this.__translate.instant('customers.Accepts Marketing');
        break;

      case 0:
        status = this.__translate.instant(
          'customers.Does not Accept Marketing'
        );
        break;

      default:
        status = this.__translate.instant('common.na');
        break;
    }

    return status;
  }

  getMarketingValidation(value: 1 | 0 | null): string {
    let status = '';

    switch (value) {
      case 1:
        status = this.__translate.instant('common.valid');
        break;

      case 0:
        status = this.__translate.instant('common.invalid');
        break;

      default:
        status = this.__translate.instant('common.na');
        break;
    }

    return status;
  }

  getClassForMarketing(fieldValue: 1 | 0 | null): any {
    return {
      'accepts-marketing': fieldValue === 1,
      'doesnt-accept-marketing': fieldValue === 0,
      'not-specified': fieldValue === null,
    };
  }

  openCustomerPopup(customer: Customer): void {
    import('../view-customer-popup/view-customer-popup.component').then(
      (component) => {
        this.__dialog.open(component.ViewCustomerPopupComponent, {
          styleClass: 'all-customers__customer-popup',
          data: {
            id: customer.id,
          },
        });
      }
    );
  }

  getAllSources(): void {
    this.__peopleApi.getAllSources().subscribe((data) => {
      this.sourceOptions = data.data;
    });
  }
  //#endregion
}
