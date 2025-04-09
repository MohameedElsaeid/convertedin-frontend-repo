import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-refund-policy',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './refund-policy.component.html',
  styleUrls: ['./refund-policy.component.scss'],
})
export class RefundPolicyComponent {
  constructor(private dialogRef: DynamicDialogRef) {}
  close() {
    this.dialogRef.close();
  }
}
