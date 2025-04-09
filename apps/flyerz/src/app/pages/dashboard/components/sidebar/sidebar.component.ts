import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { routes } from './routes';
import { AuthApi } from '@flyerz/shared/api';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { Subject } from 'rxjs';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

declare const fcWidget: any;

@Component({
  selector: '[convertedin-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    NgFor,
    NgClass,
    RouterLink,
    TranslateModule,
    ButtonModule,
    RouterLinkActive,
  ],
})
export class SidebarComponent implements OnInit, OnDestroy {
  //#region Declerations
  get routes() {
    return routes;
  }
  private __unsubscriber: Subject<void> = new Subject();
  isExact: boolean = false;
  //#endregion

  constructor(private __authApi: AuthApi, private __router: Router) {}

  ngOnInit(): void {
    this.isExact = this.getExact(this.__router.url);
    this.__router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isExact = this.getExact(event.url);
      }
    });
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  logout(): void {
    this.__authApi.logout().subscribe(() => {
      localStorage.removeItem(LocalStorageConstants.TOKEN);
      window.location.reload();
    });
  }

  openChat(): void {
    fcWidget?.open();
  }

  getExact(route: string): boolean {
    return route === '/my-dashboard' || route.includes('ad-details');
  }
  //#endregion
}
