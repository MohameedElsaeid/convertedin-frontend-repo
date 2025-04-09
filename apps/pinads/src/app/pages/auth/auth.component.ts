import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from '@pinads/shared/components/footer/footer.component';
import { HeaderComponent } from '@pinads/shared/components/header/header.component';
import { LocalStorageConstants } from '@pinads/shared/constants';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'convertedin-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent,FooterComponent],
  providers: [],
  host: {
    class: 'flex flex-column h-full',
  },
})
export class AuthComponent implements OnInit {
  selectedLang!: string;
  languages = [
    {
      key: 'en',
      label: this.translate.instant('languages.en'),
    },
    {
      key: 'ar',
      label: this.translate.instant('languages.ar'),
    },
  ];

  constructor(private translate: TranslateService) {}
  ngOnInit(): void {
    this.selectedLang = this.translate.currentLang;
  }
  onChangeLang(e: DropdownChangeEvent) {
    localStorage.setItem(LocalStorageConstants.LANGUAGE, e.value);
    location.reload();
  }
}
