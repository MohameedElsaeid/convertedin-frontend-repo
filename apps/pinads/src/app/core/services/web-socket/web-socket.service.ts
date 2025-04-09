import { Injectable } from '@angular/core';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { ApiConstants } from '@pinads/shared/constants/api/api.constant';
import { environment } from 'apps/pinads/src/environment/environment';
import Pusher from 'pusher-js';
@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private readonly EVENT_NAME =
    'Illuminate\\Notifications\\Events\\BroadcastNotificationCreated';
  private readonly PUSHER_AUTH_ENDPOINTS =
    ApiConstants.INITIAL + ApiConstants.VERSION(1) + '/pusher/auth';

  private pusher!: Pusher;
  private userId: string | null = null;

  constructor() {
    this.initializePusher();
  }

  initializePusher() {
    if (this.pusher) return;

    const token = localStorage.getItem(LocalStorageConstants.TOKEN);
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      authEndpoint: this.PUSHER_AUTH_ENDPOINTS,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*',
        },
      },
    });

    // this.pusher.connection.bind('connected', () => {
    //   console.log('Connected to Pusher');
    // });
    // this.pusher.connection.bind('disconnected', () => {
    //   console.log('Disconnected from Pusher');
    // });
  }

  disconnect() {
    if (!this.pusher) return;
    this.pusher.disconnect();
  }

  channelListener(userId: string, fn: Function) {
    if (!this.pusher) throw 'Pusher not found';

    //if user didn't change don't resubscribe
    if (this.userId === userId) return;
    // Reinitialize pusher
    if (this.userId) {
      this.initializePusher();
    }
    this.userId = userId;
    const channel = this.pusher.subscribe(this.channelName(userId));
    channel.bind(this.EVENT_NAME, (data: any) => {
      fn(data);
    });
  }

  removeAllChannelsListener() {
    if (!this.pusher) return;

    this.userId = null;
    this.pusher.allChannels().forEach((channel) => {
      channel.unbind_all();
      this.pusher.unsubscribe(channel.name);
    });
  }

  private channelName(userId: string) {
    return 'private-users-' + userId;
  }
}
