import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthApi } from '@pinads/shared/api/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { Store } from '@ngrx/store';
import { AppActions } from '@pinads/store/app';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'convertedin-auto-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auto-login.component.html',
  styleUrls: ['./auto-login.component.scss'],
})
export class AutoLoginComponent implements OnInit {
  constructor(
    private authApi: AuthApi,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    const token = this.activeRoute.snapshot.queryParams['token'];
    
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    this.impersonateLogin(token);
  }

  impersonateLogin(token: string) {
    this.authApi
      .impersonateLogin(token)
      .pipe(
        catchError((err) => {
          this.router.navigate(['/auth/login']);
          return throwError(() => err);
        })
      )
      .subscribe((res) => {
        // const userData: UserData = {
        //   name: res.data.name,
        //   email: res.data.email,
        //   email_verified: res.data.email_verified ?? false,
        // };

        // localStorage.setItem(
        //   LocalStorageConstants.USER,
        //   JSON.stringify(userData)
        // );
        localStorage.setItem(
          LocalStorageConstants.TOKEN,
          res.data.access_token
        );
        this.store.dispatch(
          AppActions.setUserData({
            userData: res.data,
          })
        );

        this.router.navigate(['/dashboard/overview']);
      });
  }
}
