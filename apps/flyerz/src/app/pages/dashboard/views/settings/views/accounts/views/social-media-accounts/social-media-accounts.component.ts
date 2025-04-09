import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { socialMediaImports } from './imports';
import {
  AccountsApi,
  ConnectionDetails,
  SocialChannel,
  SocialMediaChannel,
} from '@flyerz/shared/api';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { Store } from '@ngrx/store';
import { ConnectAccountActions } from '@flyerz/store/connect-account';
import { DialogService } from 'primeng/dynamicdialog';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AppActions } from '@flyerz/store/app';

@Component({
  selector: 'convertedin-social-media-accounts',
  standalone: true,
  imports: socialMediaImports,
  templateUrl: './social-media-accounts.component.html',
  styleUrls: ['./social-media-accounts.component.scss'],
})
export class SocialMediaAccountsComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-4';

  private __unsubscriber: Subject<void> = new Subject();
  connectionDetails$!: Observable<{ data: ConnectionDetails }>;
  channels$!: Observable<{
    data: {
      channels: SocialMediaChannel[];
    };
  }>;
  loaders = {
    channels: true,
    card: false,
    reassign: false,
  };
  get socialChannel() {
    return SocialChannel;
  }
  //#endregion

  constructor(
    private __accountsApi: AccountsApi,
    private __store: Store,
    private __dialog: DialogService,
    private __toast: MessageService
  ) {}

  ngOnInit(): void {
    this.getChannels();
    this.__store.dispatch(ConnectAccountActions.reset());
    this.getConnectionDetails();
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  showBanner(channels: SocialMediaChannel[]): boolean {
    return (
      Object.keys(
        this.getChannel(channels, this.socialChannel.FACEBOOK).connectedAccount!
      ).length > 0 &&
      !this.getChannel(channels, this.socialChannel.INSTAGRAM).isConnected!
    );
  }

  getChannel(
    channels: SocialMediaChannel[],
    channelId: SocialChannel
  ): SocialMediaChannel {
    return channels.find((channel) => channel.id === channelId)!;
  }

  getConnectionDetails(): void {
    this.connectionDetails$ = this.__accountsApi.getConnectionDetails().pipe(
      tap(({ data }) => {
        this.__store.dispatch(AppActions.setConnectionDetails({ data }));
      })
    );
  }

  getChannels(): void {
    this.loaders.channels = true;
    this.channels$ = this.__accountsApi.getSocialMediaChannels().pipe(
      finalize(() => {
        this.loaders.channels = false;
      })
    );
  }

  openSuccessPopup(): void {
    import(
      '@flyerz/shared/components/success-popup/success-popup.component'
    ).then((component) => {
      this.__dialog.open(component.SuccessPopupComponent, {
        styleClass: 'success-popup',
        data: {
          title: 'dashboard.settings.connect-success-popup.title',
          subtitle: 'dashboard.settings.connect-success-popup.subtitle',
          route: '/create-ad',
          btnText: 'dashboard.settings.connect-success-popup.btn',
        },
      });
    });
  }

  connectInstagram(pageId: string): void {
    this.loaders.card = true;
    this.__accountsApi
      .connectToSocialMedia(pageId, SocialChannel.INSTAGRAM)
      .pipe(
        takeUntil(this.__unsubscriber),
        catchError((error: HttpErrorResponse) => this.catchRequestError(error)),
        finalize(() => {
          this.loaders.card = false;
        })
      )
      .subscribe(() => {
        this.openSuccessPopup();
        this.getChannels();
        this.getConnectionDetails();
      });
  }

  connectChannel(channel: SocialChannel, channels: SocialMediaChannel[]): void {
    if (channel === SocialChannel.INSTAGRAM) {
      this.connectInstagram(
        this.getChannel(channels, SocialChannel.FACEBOOK).connectedAccount!.page
          .id
      );
    }
  }

  reassign(): void {
    this.loaders.reassign = true;
    this.__accountsApi
      .reassignAccount()
      .pipe(
        takeUntil(this.__unsubscriber),
        catchError((error: HttpErrorResponse) => this.catchRequestError(error)),
        finalize(() => {
          this.loaders.reassign = false;
        })
      )
      .subscribe(() => {
        this.getChannels();
        this.getConnectionDetails();
      });
  }

  catchRequestError(error: HttpErrorResponse): Observable<any> {
    this.__toast.add({
      summary: error.error?.message,
      severity: 'error',
    });
    return throwError(() => error);
  }
  //#endregion
}
