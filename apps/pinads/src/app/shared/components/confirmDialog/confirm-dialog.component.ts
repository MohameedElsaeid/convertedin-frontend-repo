import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-confirm-dialog',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  message!: string;
  title!: string;
  constructor(
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {}
  ngOnInit(): void {
    this.message = this.dialogConfig.data.message;
    this.title = this.dialogConfig.data.title;
  }

  cancel() {
    this.dialogRef.close();
  }
  confirm() {
    this.dialogRef.close(true);
  }
}
