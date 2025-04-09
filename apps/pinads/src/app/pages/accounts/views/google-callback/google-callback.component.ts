import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'convertedin-google-callback',
  templateUrl: './google-callback.component.html',
  styleUrls: ['./google-callback.component.scss'],
  imports: [
    NgIf,
    AsyncPipe,
    ProgressSpinnerModule,
    AngularSvgIconModule,
    TranslateModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex align-items-center justify-content-center h-full',
  },
})
export class GoogleCallbackComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private translate: TranslateService,
    private toast: MessageService
  ) {}
  ngOnInit(): void {
    const { error } = this.activeRoute.snapshot.queryParams;
    if (!error) {
      this.router.navigate(['/dashboard']);
      return;
    }
    if (error) {
      this.showErrToast(error);
      this.router.navigate(['/account']);
    }
  }
  showErrToast(err: string) {
    switch (err) {
      case 'access_denied':
        this.toast.add({
          severity: 'error',
          summary: this.translate.instant('error'),
          detail: this.translate.instant('googleCallback.access_denied'),
        });
        break;
      case 'no_businesses_found':
        this.toast.add({
          severity: 'error',
          summary: this.translate.instant('error'),
          detail: this.translate.instant('googleCallback.no_businesses_found'),
        });
        break;
    }
  }
}
