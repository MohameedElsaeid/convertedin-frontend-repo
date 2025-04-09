import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { LocalStorageConstants } from '@converted-pay/shared/constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-select-app-lang',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule, OverlayPanelModule],
  templateUrl: './select-app-lang.component.html',
  styleUrls: ['./select-app-lang.component.scss'],
})
export class SelectAppLangComponent {
  @Input() isWhiteBg = false;
  isOpen = false;
  langList = [
    { name: 'English', code: 'en' },
    { name: 'عربي', code: 'ar' },
  ];
  selectedLang = this.translate.currentLang;

  constructor(private translate: TranslateService) {}
  changeLang(lang: string): void {
    this.selectedLang = lang;
    localStorage.setItem(LocalStorageConstants.LANGUAGE, lang);
    window.location.reload();
  }
}
