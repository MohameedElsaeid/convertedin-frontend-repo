import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SpinnerComponent,
  SuccessPopupComponent,
} from '@flyerz/shared/components';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-post-payment',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './post-payment.component.html',
  styleUrls: ['./post-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostPaymentComponent implements OnInit {
  @HostBinding('class') class =
    'flex flex-column flex-grow-1 justify-content-center align-items-center';

  constructor(
    private __activeRoute: ActivatedRoute,
    private __router: Router,
    private __dialog: DialogService
  ) {}

  ngOnInit(): void {
    const queryParams = this.__activeRoute.snapshot.queryParams;

    if (Object.keys(queryParams).length === 0) {
      this.__router.navigate(['/my-dashboard']);
    } else {
      if (JSON.parse(queryParams?.['success'])) {
        this.openSuccessPopup();
      }
      this.__router.navigate(['/my-dashboard/wallet']);
    }
  }

  openSuccessPopup(): void {
    this.__dialog.open(SuccessPopupComponent, {
      styleClass: 'success-popup',
      data: {
        title: 'dashboard.wallet.payment-success',
        route: '/my-dashboard/wallet',
        btnText: 'common.okay',
      },
    });
  }
}
