import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-missing-push-config-popup',
  templateUrl: './missing-push-config-popup.component.html',
  styleUrls: ['./missing-push-config-popup.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TranslateModule],
})
export class MissingPushConfigPopupComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column gap-4';
  assetsUrl!: string;

  constructor(private __dialogRef: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.assetsUrl = this.__dialogRef.data['url'];
  }
}
