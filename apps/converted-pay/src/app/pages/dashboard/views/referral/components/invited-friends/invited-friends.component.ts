import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InvitedUsers } from '@converted-pay/shared/api/user';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'convertedin-invited-friends',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    TranslateModule,
    InfiniteScrollModule,
  ],
  templateUrl: './invited-friends.component.html',
  styleUrls: ['./invited-friends.component.scss'],
})
export class InvitedFriendsComponent {
  @Input() invitedUsers!: InvitedUsers;
  @Output() onScroll = new EventEmitter();
}
