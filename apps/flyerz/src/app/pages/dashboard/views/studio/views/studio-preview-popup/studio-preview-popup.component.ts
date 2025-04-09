import { Component, HostBinding, OnInit } from '@angular/core';
import { AiServiceItem } from '@flyerz/shared/api';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'convertedin-studio-preview-popup',
  standalone: true,
  imports: [ButtonModule, TranslateModule],
  templateUrl: './studio-preview-popup.component.html',
  styleUrls: ['./studio-preview-popup.component.scss'],
})
export class StudioPreviewPopupComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column';
  data!: AiServiceItem;
  mode!: 'image' | 'video';
  copied: boolean = false;
  timeoutId!: any;
  //#endregion

  constructor(
    private __dialogRef: DynamicDialogRef,
    private __dialogData: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.data = this.__dialogData.data['item'];
    this.mode = this.__dialogData.data['mode'];
  }

  //#region Methods
  close(): void {
    this.__dialogRef.close();
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.data.url).then(() => {
      this.copied = true;
      this.toggleCopied();
    });
  }

  toggleCopied(): void {
    this.timeoutId = setTimeout(() => {
      this.copied = !this.copied;
      clearTimeout(this.timeoutId);
    }, 2000);
  }
  //#endregion
}
