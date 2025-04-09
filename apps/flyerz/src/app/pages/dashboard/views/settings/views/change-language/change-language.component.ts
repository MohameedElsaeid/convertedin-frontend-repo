import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { LocalStorageConstants } from '@flyerz/shared/constants';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'convertedin-change-language',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
  ],
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangeLanguageComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-6';

  selectedLanguage!: string;

  languages: Array<{ name: string; value: string }> = [
    {
      name: 'العربية',
      value: 'ar',
    },
    {
      name: 'English',
      value: 'en',
    },
    {
      name: 'Portuguese',
      value: 'pt',
    },
  ];
  //#endregion

  constructor(private __translate: TranslateService) {}

  ngOnInit(): void {
    this.selectedLanguage = localStorage.getItem(
      LocalStorageConstants.LANGUAGE
    )!;
  }

  changeLang(): void {
    this.__translate.setDefaultLang(this.selectedLanguage);
    this.__translate.currentLang = this.selectedLanguage;
    document.documentElement.lang = this.selectedLanguage;
    document.documentElement.dir =
      this.selectedLanguage === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem(LocalStorageConstants.LANGUAGE, this.selectedLanguage);
    window.location.reload();
  }
}
