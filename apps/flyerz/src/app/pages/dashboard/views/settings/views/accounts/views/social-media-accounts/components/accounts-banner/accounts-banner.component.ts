import { Component, HostBinding, Input } from '@angular/core';
import { SocialMediaChannel } from '@flyerz/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { NgIf } from '@angular/common';

@Component({
  selector: 'convertedin-accounts-banner',
  standalone: true,
  imports: [ButtonModule, TranslateModule, NgIf],
  templateUrl: './accounts-banner.component.html',
  styleUrls: ['./accounts-banner.component.scss'],
})
export class AccountsBannerComponent {
  //#region Declerations
  @Input({ required: true }) channel!: SocialMediaChannel;

  @HostBinding('class') class = 'flex align-items-center';
  @HostBinding('class.dashboard-accounts__can-connect') get canConnect() {
    return this.channel.canConnectInstagram;
  }
  @HostBinding('class.dashboard-accounts__cannot-connect') get cannotConnect() {
    return !this.channel.canConnectInstagram;
  }
  @HostBinding('class.dashboard-accounts__need-reasign') get needReassign() {
    return !this.channel.connectedAccount?.isAssigned;
  }
  //#endregion

  constructor(private __dialog: DialogService) {}

  //#region Methods
  getIcon(): string {
    let icon = 'assets/icons/common/info-circle.svg';

    if (this.needReassign) {
      icon = 'assets/icons/common/warning-circle.svg';
    } else if (this.canConnect) {
      icon = 'assets/icons/common/success.svg';
    }

    return icon;
  }

  getTitle(): string {
    let title = 'dashboard.settings.accounts.cannot-connect';

    if (this.needReassign) {
      title = 'dashboard.settings.accounts.reassign-popup.message';
    } else if (this.canConnect) {
      title = 'dashboard.settings.accounts.can-connect';
    }

    return title;
  }

  openReasignPopup(): void {
    import('../../../reassign-popup/reassign-popup.component').then(
      (component) => {
        this.__dialog.open(component.ReassignPopupComponent, {
          dismissableMask: false,
          styleClass: 'reasign-popup',
        });
      }
    );
  }
  //#endregion
}
