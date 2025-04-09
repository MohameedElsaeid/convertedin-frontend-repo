import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { AppActions, appFeature } from '@pinads/store/app';
import { MenuItem } from 'primeng/api';
import { filter, startWith } from 'rxjs';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LangDropdownComponent } from '@pinads/shared/components';
import { NotificationComponent } from '../notification/notification.component';
import { AuthApi } from '@pinads/shared/api/auth';

@Component({
  selector: 'convertedin-dashboard-header',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    BreadcrumbModule,
    TranslateModule,
    LangDropdownComponent,
    OverlayPanelModule,
    NotificationComponent,
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  home = { icon: 'pi pi-home', routerLink: '/dashboard/overview' };
  menuItems: MenuItem[] = [];
  user$ = this.store.select(appFeature.selectUserData);

  constructor(
    private translate: TranslateService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private destroyRef: DestroyRef,
    private store: Store,
    private authApi: AuthApi
  ) {}
  ngOnInit(): void {
    this.subscribeRouteChanges();
  }
  subscribeRouteChanges() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(''),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.menuItems = this.createBreadcrumbs(this.activeRoute.root);
      });
  }

  logout() {
    this.authApi.logout().subscribe(() => {
      localStorage.removeItem(LocalStorageConstants.TOKEN);
      localStorage.removeItem(LocalStorageConstants.USER);
      this.store.dispatch(AppActions.removeUserData());
      this.router.navigate(['/auth/login']);
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    routerLink = '',
    breadcrumbs: MenuItem[] = []
  ): any {
    const skippedRoutes = ['dashboard'];
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(
        (segment) => segment.path
      )[0];

      if (routeURL && routeURL !== '') {
        routerLink += `/${routeURL}`;
      }

      if (routeURL && !skippedRoutes.includes(routeURL)) {
        const label = this.translate.instant('route.' + routeURL);
        breadcrumbs.push({ label, routerLink });
      }

      return this.createBreadcrumbs(child, routerLink, breadcrumbs);
    }
  }
}
