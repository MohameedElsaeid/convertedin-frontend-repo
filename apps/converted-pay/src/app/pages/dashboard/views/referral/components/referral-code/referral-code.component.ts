import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CopyClipboardDirective,
  LogEventsDirective,
} from '@converted-pay/shared/directives';
import { Referral } from '@converted-pay/shared/api/user';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-referral-code',
  standalone: true,
  imports: [
    CommonModule,
    CopyClipboardDirective,
    TranslateModule,
    LogEventsDirective,
  ],
  templateUrl: './referral-code.component.html',
  styleUrls: ['./referral-code.component.scss'],
})
export class ReferralCodeComponent {
  @Input() referral!: Referral;
  isCopied = false;
  get hostname() {
    return `${location.protocol}//${location.hostname}`;
  }
  get referralUrl() {
    return `${this.hostname}/auth/register/${this.referral.code}`;
  }
  copied() {
    this.isCopied = true;
  }
}
