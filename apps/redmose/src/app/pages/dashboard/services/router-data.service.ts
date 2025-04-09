import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterDataService {
  private routerDataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root.firstChild?.snapshot.data)
      )
      .subscribe(routeData => {
        this.setRouterData(routeData);
      });
  }

  setRouterData(data: any) {
    this.routerDataSubject.next(data);
  }

  getRouterData(): Observable<any> {
    return this.routerDataSubject.asObservable();
  }
}
