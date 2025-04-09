import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { AdFinishReason, AdsApi, provideAdsApi } from '@flyerz/shared/api';
import { SpinnerComponent } from '@flyerz/shared/components';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'convertedin-close-ad-popup',
  standalone: true,
  imports: [CommonModule, SpinnerComponent, ButtonModule, TranslateModule],
  templateUrl: './close-ad-popup.component.html',
  styleUrls: ['./close-ad-popup.component.scss'],
  providers: [provideAdsApi()],
})
export class CloseAdPopupComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-20';
  adId!: string | number;
  finishReasons$!: Observable<{ data: Array<AdFinishReason> }>;
  isLoading: boolean = true;
  activeReason!: AdFinishReason;
  //#endregion

  constructor(
    private __dialogRef: DynamicDialogRef,
    private __dialog: DialogService,
    private __dialogData: DynamicDialogConfig,
    private __adsApi: AdsApi,
    private __toast: MessageService
  ) {}

  ngOnInit(): void {
    this.adId = this.__dialogData.data.adId;

    this.finishReasons$ = this.__adsApi.getAdFinishReasons().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );
  }

  //#region Methods
  reasonSelected(reason: AdFinishReason): void {
    this.activeReason = reason;
  }

  closeDialog(): void {
    this.__dialogRef.close();
  }

  cancelAd(): void {
    this.__adsApi
      .finishAd(this.adId, this.activeReason.id)
      .pipe(
        catchError((error: HttpErrorResponse) => this.catchResponseError(error))
      )
      .subscribe(() => {
        this.openSuccessDialog();
        this.closeDialog();
      });
  }

  openConfirmPopup(): void {
    import(
      '@flyerz/shared/components/confirm-popup/confirm-popup.component'
    ).then((component) => {
      this.closeDialog();
      this.__dialog.open(component.ConfirmPopupComponent, {
        styleClass: 'confirm-popup',
        data: {
          btnText: 'dashboard.ad-details.finish-ad-btn',
          title: 'common.confirm',
          onConfirm: () => {
            this.cancelAd();
            this.closeDialog();
          },
        },
      });
    });
  }

  openSuccessDialog(): void {
    import(
      '@flyerz/shared/components/success-popup/success-popup.component'
    ).then((component) => {
      this.__dialog.open(component.SuccessPopupComponent, {
        styleClass: 'success-popup',
        data: {
          title: 'dashboard.ad-details.finish-ad-success',
          route: '/my-dashboard',
          btnText: 'common.okay',
        },
      });
    });
  }

  catchResponseError(error: HttpErrorResponse): Observable<never> {
    this.__toast.add({
      summary: error.error?.message,
      severity: 'error',
    });
    return throwError(() => error);
  }
  //#endregion
}
