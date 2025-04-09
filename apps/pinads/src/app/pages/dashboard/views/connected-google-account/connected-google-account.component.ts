import { Component, DestroyRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Brand, BrandApi, provideBrandService } from '@pinads/shared/api/brand';
import { Observable, map } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmDialogComponent } from '@pinads/shared/components';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'convertedin-connected-google-account',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, RouterLink, TranslateModule],
  templateUrl: './connected-google-account.component.html',
  styleUrls: ['./connected-google-account.component.scss'],
  host: {
    class: 'p-4 block w-full md:w-8 lg:w-6 mx-auto',
  },
  providers: [provideBrandService(), DialogService],
})
export class ConnectedGoogleAccountComponent implements OnInit {
  activeBrand$!: Observable<Brand>;
  constructor(
    private brandApi: BrandApi,
    private dialog: DialogService,
    private translateService: TranslateService,
    private destroyRef: DestroyRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getActiveBrand();
  }

  getActiveBrand() {
    this.activeBrand$ = this.brandApi
      .getActiveBrand()
      .pipe(map((res) => res.data));
  }

  openConfirmDialog() {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: this.translateService.instant(
            'connectedGoogleAccount.confirmDialog.title'
          ),
          message: this.translateService.instant(
            'connectedGoogleAccount.confirmDialog.message'
          ),
        },
        showHeader: false,
        styleClass: 'confirm-dialog',
      })
      .onClose.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        if (res) {
          this.router.navigate(['/account/google']);
        }
      });
  }
}
