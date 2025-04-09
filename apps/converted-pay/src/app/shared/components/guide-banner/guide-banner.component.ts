import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { DialogService } from 'primeng/dynamicdialog';
import { GuideVideoPopupComponent } from '../guide-video-popup/guide-video-popup.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-guide-banner',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, TranslateModule],
  templateUrl: './guide-banner.component.html',
  styleUrls: ['./guide-banner.component.scss'],
})
export class GuideBannerComponent {
  @Input() type: 'charge_account' | 'connect_account' = 'connect_account';
  show = true;
  guideOptions = {
    charge_account: {
      videoId: { ar: 'd-2rWXr6STM', en: 'd-2rWXr6STM' },
      title: 'guideBanner.chargeAccount.title',
      desc: 'guideBanner.chargeAccount.desc',
    },
    connect_account: {
      videoId: { ar: 'GAbc_TePavU', en: '2R9JQ8JTGFo' },
      title: 'guideBanner.connectAccount.title',
      desc: 'guideBanner.connectAccount.desc',
    },
  };

  constructor(
    private dialog: DialogService,
    private translate: TranslateService
  ) {}

  openGuideVideo() {
    this.dialog.open(GuideVideoPopupComponent, {
      styleClass: 'guide-video-popup',
      data: {
        videoId:
          this.guideOptions[this.type].videoId[
            this.translate.currentLang as 'ar' | 'en'
          ],
      },
    });
  }
  get title() {
    return this.guideOptions[this.type].title;
  }
  get desc() {
    return this.guideOptions[this.type].desc;
  }
}
