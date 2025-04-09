import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'convertedin-ad-reject-reason-popup',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonModule],
  templateUrl: './ad-reject-reason-popup.component.html',
  styleUrls: ['./ad-reject-reason-popup.component.scss'],
})
export class AdRejectReasonPopupComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column gap-3';
  reject!: {
    title?: string;
    reason?: string;
    solutionSteps?: string;
    rejected_by?: {
      id: number;
      name: string;
    };
  };

  constructor(
    private __dialog: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.reject = this.__dialogData.data.reject;
  }

  close(): void {
    this.__dialog.close();
  }
}
