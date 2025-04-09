import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserWallet } from '@flyerz/store/app';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'convertedin-wallet-value-banner',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, RouterLink],
  templateUrl: './wallet-value-banner.component.html',
  styleUrls: ['./wallet-value-banner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletValueBannerComponent implements OnInit {
  @Input({ required: true }) compareValue!: number;
  @Output() walletValue: EventEmitter<number> = new EventEmitter();
  userWallet$!: Observable<{
    wallet: number | undefined;
    currency: undefined | { id: number; name: string; symbol: string };
  }>;

  constructor(private __store: Store) {}

  ngOnInit(): void {
    this.userWallet$ = this.__store.select(selectUserWallet).pipe(
      tap((data) => {
        this.walletValue.emit(data.wallet);
      })
    );
  }
}
