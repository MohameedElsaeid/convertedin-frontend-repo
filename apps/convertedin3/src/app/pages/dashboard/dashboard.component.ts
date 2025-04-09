import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';;
import { DASHBOARD_IMPORTS } from './imports';
import { filter, map, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'convertedin-dashboard',
  standalone: true,
  imports: [DASHBOARD_IMPORTS],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit,OnDestroy{
  @HostBinding('class') class = 'flex flex-column h-full w-full';
  title = '';
  subtitle = '';
  private routeSub!: Subscription;
  constructor(private router:Router, public route:ActivatedRoute) {}
  ngOnInit(): void {
    this.route.firstChild?.firstChild?.firstChild ? this.updateRouteData(this.route.firstChild.firstChild?.firstChild) : null;
    this.routeSub = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.route),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
    ).subscribe((activeRoute: ActivatedRoute) => {
      this.updateRouteData(activeRoute);
    });
  }

  private updateRouteData(activeRoute: ActivatedRoute): void {
    const routeData = activeRoute.snapshot.data;
    this.title = routeData['title'];
    this.subtitle = routeData['subtitle'] || '';
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
