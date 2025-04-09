import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-budget-breakdown',
  standalone: true,
  imports: [DecimalPipe, TranslateModule],
  templateUrl: './budget-breakdown.component.html',
  styleUrls: ['./budget-breakdown.component.scss'],
})
export class BudgetBreakdownComponent {
  data!: BudgetBreakdown;
  constructor(
    private dialogConfig: DynamicDialogConfig<BudgetBreakdown>,
    private dialogRef: DynamicDialogRef
  ) {
    this.data = this.dialogConfig.data!;
  }
  get adAmount() {
    return this.data.total - this.data.serviceFees - this.vat;
  }

  get vat() {
    return (this.data.tax / 100) * this.data.total;
  }
  close() {
    this.dialogRef.close();
  }
}
export interface BudgetBreakdown {
  serviceFees: number;
  tax: number;
  total: number;
}
