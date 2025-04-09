import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { AccountsApi, provideAccountsApi } from '@flyerz/shared/api';
import { AppActions } from '@flyerz/store/app';
import { AuthActions } from '@flyerz/store/auth';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

declare const fcWidget: any;

@Component({
  selector: 'convertedin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  providers: [provideAccountsApi()],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'py-3 dashboard flex gap-3 flex-grow-1';
  private __unsubscriber: Subject<void> = new Subject();

  constructor(private __store: Store, private __accountsApi: AccountsApi) {}

  ngOnInit(): void {
    if (document.getElementById('fc_frame')) {
      fcWidget.show();
    }

    this.getConnectionDetails();

    this.__store.dispatch(AuthActions.resetState());
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  getConnectionDetails(): void {
    this.__accountsApi
      .getConnectionDetails()
      .pipe(takeUntil(this.__unsubscriber))
      .subscribe(({ data }) => {
        this.__store.dispatch(AppActions.setConnectionDetails({ data }));
      });
  }
}
