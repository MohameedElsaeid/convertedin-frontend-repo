import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-image-view-dialog',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './image-view-dialog.component.html',
  styleUrls: ['./image-view-dialog.component.scss'],
})
export class ImageViewDialogComponent {
  imageUrl!: string;
  transactionRef!: string;
  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig<any>
  ) {
    this.imageUrl = this.dialogConfig.data.imageUrl;
    this.transactionRef = this.dialogConfig.data.transactionRef;
  }
  close() {
    this.dialogRef.close();
  }
}
