import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LocalStorageConstants } from '@converted-pay/shared/constants';
import { Store } from '@ngrx/store';
import { selectUserData } from '@converted-pay/store/app';
import { TranslateModule } from '@ngx-translate/core';
import { routeList } from '../../data';

@Component({
  selector: '[convertedin-sidebar]',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    TranslateModule,
    ButtonModule,
    NgFor,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @HostBinding('class') class = 'converted-pay__sidebar flex flex-column';

  routes = routeList;
  userData$ = this.store.select(selectUserData);
  constructor(private router: Router, private store: Store) {}
  logout() {
    localStorage.removeItem(LocalStorageConstants.TOKEN);
    this.router.navigate(['/auth/login']);
  }
}
