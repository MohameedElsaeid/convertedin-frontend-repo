import { Component, OnInit } from '@angular/core';
import {
  GuideBannerComponent,
  HeaderComponent,
  OfferBannerComponent,
} from '@converted-pay/shared/components';
import { DialogService } from 'primeng/dynamicdialog';

import { HomeBannersComponent } from './components/home-banners/home-banners.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserData } from '@converted-pay/shared/api';
import { selectUserData } from '@converted-pay/store/app';
import { AsyncPipe, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-home',
  standalone: true,
  imports: [
    HomeBannersComponent,
    TransactionsTableComponent,
    HeaderComponent,
    NgIf,
    AsyncPipe,
    GuideBannerComponent,
    OfferBannerComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DialogService],
})
export class HomeComponent implements OnInit {
  userData$!: Observable<UserData | undefined>;
  constructor(private __store: Store) {}

  ngOnInit(): void {
    this.userData$ = this.__store.select(selectUserData);
  }
}
