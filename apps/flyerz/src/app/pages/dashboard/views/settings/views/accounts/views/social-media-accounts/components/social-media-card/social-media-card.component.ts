import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialChannel, SocialMediaChannel } from '@flyerz/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConnectAccountActions } from '@flyerz/store/connect-account';

@Component({
  selector: 'convertedin-social-media-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule, RouterModule],
  templateUrl: './social-media-card.component.html',
  styleUrls: ['./social-media-card.component.scss'],
})
export default class SocialMediaCardComponent {
  //#region Declerations
  @HostBinding('class') class = 'dashboard-accounts flex flex-column w-full';
  @Input({ required: true }) channel!: SocialMediaChannel;
  @Input() isLoading: boolean = false;
  @Input() isReassignLoading: boolean = false;
  @Output() connectChannel: EventEmitter<SocialChannel> = new EventEmitter();
  @Output() reassign: EventEmitter<void> = new EventEmitter();

  get channels() {
    return SocialChannel;
  }
  //#endregion

  constructor(private __store: Store, private __router: Router) {}

  //#region Methods
  setChannelId(id: number): void {
    this.__store.dispatch(ConnectAccountActions.setChannelID({ id }));
  }

  getSocialMediaImg(): string {
    let img = '';
    switch (this.channel.id) {
      case 1:
        img = 'assets/icons/common/channels/Facebook.svg';
        break;

      case 2:
        img = 'assets/icons/common/channels/Instagram.svg';
        break;
    }

    return img;
  }

  getStatusText(): string {
    if (
      !this.channel.connectedAccount?.isTokenValid &&
      this.channel.isConnected
    ) {
      return 'dashboard.settings.accounts.reassign';
    }
    if (this.channel.isConnected) {
      return 'common.connected-status';
    }
    return 'common.not-connected-status';
  }

  connectAccount(): void {
    if (this.channel.id === SocialChannel.INSTAGRAM) {
      this.connectChannel.emit(this.channel.id);
    } else if (this.channel.id === SocialChannel.FACEBOOK) {
      if (
        !this.channel.connectedAccount?.isTokenValid &&
        this.channel.connectedAccount?.isAssigned
      ) {
        this.__router.navigate(
          ['/my-dashboard/settings/accounts/connect-facebook'],
          {
            queryParams: {
              refresh: true,
            },
          }
        );
      } else {
        this.setChannelId(this.channel.id);
        this.__router.navigate([
          '/my-dashboard/settings/accounts/connect-facebook',
        ]);
      }
    }
  }
  //#endregion
}
