import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-missing-sms-config-popup',
  imports: [CommonModule],
  templateUrl: './missing-sms-config-popup.component.html',
  styleUrls: ['./missing-sms-config-popup.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MissingSmsConfigPopupComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column gap-4';
  assetsUrl!: string;

  constructor(private __dialogRef: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.assetsUrl = this.__dialogRef.data['url'];
  }
}
