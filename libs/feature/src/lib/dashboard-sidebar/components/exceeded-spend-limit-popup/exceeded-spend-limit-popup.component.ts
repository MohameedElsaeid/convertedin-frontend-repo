import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-exceeded-spend-limit-popup',
  templateUrl: './exceeded-spend-limit-popup.component.html',
  styleUrls: ['./exceeded-spend-limit-popup.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExceededSpendLimitPopupComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column gap-4';
  assetsUrl!: string;

  constructor(private __dialogRef: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.assetsUrl = this.__dialogRef.data['url'];
  }
}
