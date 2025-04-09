import {
  Component,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialAccount } from '@converted-pay/shared/api';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-account-card',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.scss'],
  host: {
    class:
      'p-4 border-round-lg border-2 border-gray-200 shadow-1 cursor-pointer w-full md:w-auto',
  },
})
export class AccountCardComponent {
  @Input({ required: true }) account!: SocialAccount;
  @Input() selectedAccount!: SocialAccount;
  @HostBinding('class.active') get isActive() {
    return this.account.id === this.selectedAccount?.id;
  }
  @HostBinding('class.disabled') get isDisabled() {
    return !this.account.isActive;
  }
}
