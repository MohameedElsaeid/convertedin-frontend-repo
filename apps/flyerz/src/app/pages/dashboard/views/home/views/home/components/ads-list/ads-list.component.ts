import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Ad, AdStatus } from '@flyerz/shared/api';
import { DropdownItem } from '@flyerz/shared/models/interfaces';
import { selectCurrency } from '@flyerz/store/app';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Observable } from 'rxjs';

@Component({
  selector: 'convertedin-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DropdownModule,
    RouterLink,
    ButtonModule,
  ],
})
export class AdsListComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex-grow-1 flex flex-column';
  @Input({ required: true }) isFacebookConnected: boolean = false;
  @Input({ required: true }) ads!: Array<Ad>;
  @Input() activeSort: AdStatus = AdStatus.ALL;
  @Output() sortChange: EventEmitter<AdStatus> = new EventEmitter();
  @Output() createAdClick: EventEmitter<void> = new EventEmitter();

  currency$!: Observable<string | undefined>;
  adSorting: Array<DropdownItem> = [
    {
      label: this.__translate.instant('dashboard.home.ad-sorting.all'),
      value: AdStatus.ALL,
    },
    {
      label: this.__translate.instant('dashboard.home.ad-sorting.pending'),
      value: AdStatus.PENDING,
    },
    {
      label: this.__translate.instant('dashboard.home.ad-sorting.approved'),
      value: AdStatus.APPROVED,
    },
    {
      label: this.__translate.instant('dashboard.home.ad-sorting.rejected'),
      value: AdStatus.REJECTED,
    },
    {
      label: this.__translate.instant('dashboard.home.ad-sorting.finished'),
      value: AdStatus.FINISHED,
    },
    {
      label: this.__translate.instant('dashboard.home.ad-sorting.paused'),
      value: AdStatus.PAUSED,
    },
    {
      label: this.__translate.instant('dashboard.home.ad-sorting.active'),
      value: AdStatus.ACTIVE,
    },
  ];
  //#endregion

  constructor(private __store: Store, private __translate: TranslateService) {}

  ngOnInit(): void {
    this.currency$ = this.__store.select(selectCurrency);
  }

  //#region Methods
  sortChanged(): void {
    this.sortChange.emit(this.activeSort);
  }

  getAdStatusColor(ad: Ad): string {
    let color = 'pending';

    switch (ad.status.id) {
      case AdStatus.REJECTED:
        color = 'rejected';
        break;

      case AdStatus.FINISHED:
      case AdStatus.APPROVED:
      case AdStatus.ACTIVE:
        color = 'active';
        break;

      case AdStatus.PAUSED:
      case AdStatus.PENDING:
        color = 'pending';
        break;
    }

    return color;
  }
  //#endregion
}
