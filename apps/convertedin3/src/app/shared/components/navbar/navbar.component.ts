import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { LocalStorageConstants } from '@convertedin3/shared/constants';


@Component({
  selector: 'convertedin-navbar',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() pageTitle: string | undefined;
  @Input() pageSubTitle: string | undefined;
  selectedLang!: string;
  languages = [
    {
      key: 'en',
      label: this.__translate.instant('languages.en'),
    },
    {
      key: 'ar',
      label: this.__translate.instant('languages.ar'),
    },
  ];
  constructor(private __translate: TranslateService){}

  get activeLang() {
    return this.__translate.currentLang
  }

  ngOnInit(): void {
    this.selectedLang = this.__translate.currentLang;
  }

  onChangeLang(e: DropdownChangeEvent) {
    localStorage.setItem(LocalStorageConstants.LANGUAGE, e.value);
    location.reload();
  }

}
