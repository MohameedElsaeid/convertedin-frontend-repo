import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@pinads/shared/components/header/header.component';
import { FooterComponent } from '@pinads/shared/components/footer/footer.component';
import { privacyPolicyEn } from './data/privacy-policy-en.data';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { privacyPolicyAr } from './data/privacy-police-ar.data';

@Component({
  selector: 'convertedin-privacy-policy',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  host: {
    class: 'flex flex-column h-full',
  },
})
export class PrivacyPolicyComponent {
  privacyPolicy;
  constructor(private translate: TranslateService) {
    this.privacyPolicy =
      this.translate.currentLang === 'en' ? privacyPolicyEn : privacyPolicyAr;
  }
}
