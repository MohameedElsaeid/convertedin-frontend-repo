import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Transaction } from '@flyerz/shared/api';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'convertedin-transaction-details-popup',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule, RouterModule],
  templateUrl: './transaction-details-popup.component.html',
  styleUrls: ['./transaction-details-popup.component.scss'],
})
export class TransactionDetailsPopupComponent implements OnInit {
  transaction!: Transaction;

  constructor(
    private __ref: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.transaction = this.__dialogData.data;
  }

  closePopup(): void {
    this.__ref.close();
  }
}
