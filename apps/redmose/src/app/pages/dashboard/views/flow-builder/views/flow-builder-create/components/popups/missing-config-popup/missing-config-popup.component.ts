import { NgIf } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AuthApi, WorkFlowAction } from '@redmose/shared/api';
import { AppActions } from '@redmose/store/app';
import { environment } from 'apps/redmose/src/environment/environment';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, take } from 'rxjs';

@Component({
  selector: 'convertedin-missing-config-popup',
  templateUrl: './missing-config-popup.component.html',
  styleUrls: ['./missing-config-popup.component.scss'],
  standalone: true,
  imports: [NgIf, ButtonModule, TranslateModule],
})
export class FlowBuilderMissingConfigPopupComponent {
  @HostBinding('class') class = 'flex flex-column gap-4';
  isLoading: boolean = false;
  showErrorBanner: boolean = false;
  configObj = {
    [WorkFlowAction.EMAIL]: 'isStoreEmailConfigCompleted',
    [WorkFlowAction.NOTIFICATION]: 'isStorePushConfigCompleted',
    [WorkFlowAction.SMS]: 'isStoreSmsConfigCompleted',
  };
  get environment() {
    return environment;
  }

  constructor(
    private __dialogRef: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig,
    private __authApi: AuthApi,
    private __store: Store
  ) {}

  checkStatus(): void {
    this.isLoading = true;
    this.__authApi
      .userData()
      .pipe(
        take(1),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(({ data }) => {
        this.__store.dispatch(AppActions.setUserData({ userData: data }));
        const config = this.configObj[this.__dialogData.data['configType']];
        if (data.user[config]) {
          this.__dialogData.data['onConfigComplete']();
          this.__dialogRef.close();
        } else {
          this.showErrorBanner = true;
        }
      });
  }

  get isPushNotification(): boolean {
    return this.__dialogData.data['configType'] === WorkFlowAction.NOTIFICATION;
  }
}
