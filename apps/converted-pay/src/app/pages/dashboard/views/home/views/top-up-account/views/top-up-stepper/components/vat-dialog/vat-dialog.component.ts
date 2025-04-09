import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-vat-dialog',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './vat-dialog.component.html',
  styleUrls: ['./vat-dialog.component.scss'],
})
export class VatDialogComponent {
  vat: number;

  constructor(
    dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {
    this.vat = dialogConfig.data.vat;
  }

  close() {
    this.dialogRef.close();
  }
}
