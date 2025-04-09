import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DomSanitizerPipe } from '@converted-pay/shared/pipes/dom-sanitizer.pipe';

@Component({
  selector: 'convertedin-guide-video-popup',
  standalone: true,
  imports: [CommonModule, DomSanitizerPipe],
  templateUrl: './guide-video-popup.component.html',
  styleUrls: ['./guide-video-popup.component.scss'],
})
export class GuideVideoPopupComponent {
  videoId!: string;
  constructor(
    private dialogConfig: DynamicDialogConfig,
  ) {
    this.videoId = this.dialogConfig.data.videoId;
  }
  get videoUrl() {
    return `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1`;
  }
}
