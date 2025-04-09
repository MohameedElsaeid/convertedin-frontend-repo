import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, Location } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ProgressBarModule } from 'primeng/progressbar';
import { PaymentsApi, providePaymentsApi } from '@converted-pay/shared/api';
import { FileSizePipe } from '@converted-pay/shared/pipes';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription, finalize } from 'rxjs';
import { UploadState } from '@converted-pay/shared/utilities/upload-file';
import { LogEventsDirective } from '@converted-pay/shared/directives';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-payment-upload-receipt',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    ProgressBarModule,
    DecimalPipe,
    FileSizePipe,
    RouterLink,
    LogEventsDirective,
    TranslateModule
  ],
  templateUrl: './payment-upload-receipt.component.html',
  styleUrls: ['./payment-upload-receipt.component.scss'],
  providers: [providePaymentsApi()],
})
export class PaymentUploadReceiptComponent implements OnInit {
  file: File | null = null;
  progress = 0;
  state!: UploadState;
  invoiceId!: string;
  subscription!: Subscription;
  constructor(
    private paymentApi: PaymentsApi,
    private router: Router,
    private location: Location
  ) {}
  ngOnInit(): void {
    const { invoiceId } = history.state;

    if (!invoiceId) {
      this.router.navigate(['/dashboard/home/topup-account']);
      return;
    }
    this.invoiceId = invoiceId;
  }
  uploadFile(e: any) {
    const fileInput = e.target;
    this.file = fileInput.files[0];

    this.subscription = this.paymentApi
      .submitBankReceipt({
        bankTransferProof: this.file!,
        invoiceId: this.invoiceId,
      })
      .pipe(
        finalize(() => {
          fileInput.value = '';
        })
      )
      .subscribe((res) => {
        this.state = res.state;

        this.progress =
          res.state === 'IN_PROGRESS' ? res.progress - 1 : res.progress;
        if (res.state === 'DONE') {
          this.clearState();
        }
      });
  }
  removeFile() {
    this.file = null;
    this.subscription?.unsubscribe();
  }
  private clearState(): void {
    // Use location.replaceState to clear the state
    this.location.replaceState(this.router.url);
  }
}
