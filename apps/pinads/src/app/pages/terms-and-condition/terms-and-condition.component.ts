import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@pinads/shared/components/footer/footer.component';
import { HeaderComponent } from '@pinads/shared/components/header/header.component';
import { TermsAndConditionEn } from './data/terms-and-condition-en.data';
import { TranslateService } from '@ngx-translate/core';
import { TermsAndConditionAr } from './data/terms-and-condition-ar.data';

@Component({
  selector: 'convertedin-terms-and-condition',
  standalone: true,
  imports: [CommonModule,HeaderComponent,FooterComponent],
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss'],
  host: {
    class: 'flex flex-column h-full',
  },
})
export class TermsAndConditionComponent {
  TermsAndCondition;
  constructor(private translate: TranslateService) {
    this.TermsAndCondition =
      this.translate.currentLang === 'en' ? TermsAndConditionEn : TermsAndConditionAr;
  }
}
