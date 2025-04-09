import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'convertedin-referral-earned-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referral-earned-dialog.component.html',
  styleUrls: ['./referral-earned-dialog.component.scss'],
})
export class ReferralEarnedDialogComponent {
  constructor(private dialogRef: DynamicDialogRef, private router: Router) {}
  getGift() {
    this.router.navigate(['/dashboard/referral']);
    this.dialogRef.close();
  }
  close() {
    this.dialogRef.close();
  }
}
