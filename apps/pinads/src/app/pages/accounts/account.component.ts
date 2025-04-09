import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProvideAccountsService } from '@pinads/shared/api/accounts';
import { ProvideAuthService } from '@pinads/shared/api/auth';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { LocalStorageConstants } from '@pinads/shared/constants';

@Component({
  selector: 'convertedin-account',
  standalone: true,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [
    RouterOutlet,
    DropdownModule,
    TranslateModule,
    FormsModule,
    NgIf,
    RouterLink,
  ],
  providers: [ProvideAuthService(), ProvideAccountsService()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-column h-full px-4 md:px-6 py-4',
  },
})
export class AccountComponent implements OnInit {
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

  constructor(private translate: TranslateService, private router: Router) {}
  ngOnInit(): void {
    this.selectedLang = this.translate.currentLang;
  }
  onChangeLang(e: DropdownChangeEvent) {
    localStorage.setItem(LocalStorageConstants.LANGUAGE, e.value);
    location.reload();
  }
  logout() {
    localStorage.removeItem(LocalStorageConstants.TOKEN);
    this.router.navigate(['/auth/login']);
  }
}
