import { NgIf } from '@angular/common';
import { Component, HostBinding, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideAuthApi } from '@flyerz/shared/api';
import { BackButtonComponent } from '@flyerz/shared/components';
import { AuthActions } from '@flyerz/store/auth';
import { Store } from '@ngrx/store';

@Component({
  selector: 'convertedin-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [NgIf, BackButtonComponent, RouterOutlet],
  providers: [provideAuthApi()],
})
export class AuthComponent implements OnDestroy {
  @HostBinding('class') class = 'auth flex-grow-1 flex flex-column';

  constructor(private __store: Store) {}

  ngOnDestroy(): void {
    this.__store.dispatch(AuthActions.resetState());
  }

  showBackBtn(): boolean {
    return (
      !window.location.href.includes('login') &&
      !window.location.href.includes('country-language')
    );
  }
}
