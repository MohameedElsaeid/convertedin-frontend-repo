import { Component, HostBinding, Input } from '@angular/core';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { UserData } from '@converted-pay/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { selectCurrency } from '@converted-pay/store/app';

@Component({
  selector: 'convertedin-home-banners',
  standalone: true,
  imports: [NgIf, RouterLink, ButtonModule, NgClass, TranslateModule,AsyncPipe],
  templateUrl: './home-banners.component.html',
  styleUrls: ['./home-banners.component.scss'],
})
export class HomeBannersComponent {
  @HostBinding('class') class = 'mt-3 flex flex-column';
  @Input({ required: true }) userData!: UserData;
  isAccessGranted: boolean;
  currency$ = this.store.select(selectCurrency);
  constructor(private store: Store) {
    this.isAccessGranted = true;
  }

  hideAccessBanner(): void {
    this.isAccessGranted = false;
  }
}
