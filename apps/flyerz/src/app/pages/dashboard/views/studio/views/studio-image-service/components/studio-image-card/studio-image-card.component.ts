import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AiServiceItem } from '@flyerz/shared/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';
import { AiServiceStatus } from '@flyerz/shared/api/create-ai-media/models/enums';

@Component({
  selector: 'convertedin-image-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './studio-image-card.component.html',
  styleUrls: ['./studio-image-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudioImageCardComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-column gap-3 studio-image__card cursor-pointer justify-content-between';
  @HostListener('click') onClick = () => {
    this.openImagePopup();
  };

  @Input({ required: true }) serviceItem!: AiServiceItem;

  status!: string;
  readonly statusClasses = {
    [AiServiceStatus.RENDERING]: 'in-progress',
    [AiServiceStatus.FAILED]: 'failed',
    [AiServiceStatus.SUCCEDED]: '',
  };
  //#endregion

  constructor(
    private __dialog: DialogService,
    private __translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.status = this.__translate.instant(
      `dashboard.studio.status.${this.serviceItem.status.id}`
    );
  }

  //#region Methods
  openImagePopup(): void {
    import('../../../studio-preview-popup/studio-preview-popup.component').then(
      (component) => {
        this.__dialog.open(component.StudioPreviewPopupComponent, {
          data: {
            item: this.serviceItem,
            mode: 'image',
          },
          header: this.serviceItem.name,
          styleClass: 'dashboard-studio__popup',
        });
      }
    );
  }
  //#endregion
}
