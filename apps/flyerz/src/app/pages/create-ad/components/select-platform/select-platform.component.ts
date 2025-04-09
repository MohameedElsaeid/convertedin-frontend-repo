import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  CreateAdApi,
  CreateAdChannel,
  CreateAdChannelType,
} from '@flyerz/shared/api';
import { CreateAdActions } from '@flyerz/store/create-ad';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';
import { getSocialMediaImg } from '../../utilities';
import {
  SpinnerComponent,
  CreateAdHeaderComponent,
} from '@flyerz/shared/components';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'convertedin-select-platform',
  templateUrl: './select-platform.component.html',
  styleUrls: ['./select-platform.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    SpinnerComponent,
    CreateAdHeaderComponent,
    ButtonModule,
    RouterLink,
  ],
})
export class SelectPlatformComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-grow-1 flex-column justify-content-center gap-6 align-items-center create-ad__step';
  @Input() channel!: CreateAdChannel | undefined;

  channels$!: Observable<{ data: CreateAdChannel[] }>;
  isLoading: boolean = true;
  selectedChannel!: CreateAdChannel;
  get channelType() {
    return CreateAdChannelType;
  }
  get getSocialMediaImg() {
    return getSocialMediaImg;
  }
  get dir() {
    return document.dir;
  }
  //#endregion

  constructor(
    private __router: Router,
    private __createAdApi: CreateAdApi,
    private __store: Store
  ) {}

  ngOnInit(): void {
    this.channels$ = this.__createAdApi.getChannels().pipe(
      finalize(() => {
        this.isLoading = false;
      })
    );

    this.selectedChannel = this.channel!;
  }

  //#region Methods
  selectPlatform(channel: CreateAdChannel): void {
    if (!this.isComingSoon(channel.type.id)) {
      this.selectedChannel = channel;

      channel.isConnected && channel?.connectedAccount?.isTokenValid
        ? this.__store.dispatch(CreateAdActions.setChannel({ channel }))
        : this.__router.navigate(['/my-dashboard/settings/accounts']);
    }
  }

  isComingSoon(id: CreateAdChannelType): boolean {
    return (
      id === CreateAdChannelType.GOOGLE ||
      id === CreateAdChannelType.SNAPCHAT ||
      id === CreateAdChannelType.TIKTOK
    );
  }
  //#endregion
}
