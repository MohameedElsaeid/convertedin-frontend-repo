import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorageConstants } from '@pinads/shared/constants';

@Component({
  selector: 'convertedin-lang-dropdown',
  standalone: true,
  imports: [DropdownModule, FormsModule, TranslateModule, NgIf],
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.scss'],
})
export class LangDropdownComponent {
  selectedLang!: string;
  readonly languages = [
    {
      key: 'en',
      label: this.translate.instant('languages.en'),
    },
    {
      key: 'ar',
      label: this.translate.instant('languages.ar'),
    },
  ];

  constructor(private translate: TranslateService) {
    this.selectedLang = this.translate.currentLang;
  }

  onChangeLang(e: DropdownChangeEvent) {
    localStorage.setItem(LocalStorageConstants.LANGUAGE, e.value);
    location.reload();
  }
}
