import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'convertedin-onboarding-header',
  standalone: true,
  imports: [CommonModule,DropdownModule,FormsModule],
  templateUrl: './onboarding-header.component.html',
  styleUrls: ['./onboarding-header.component.scss'],
})
export class OnboardingHeaderComponent {
  selectedLang!: string;
  isMobileMenuOpen = false;
  readonly languages = [
    {
      key: 'en',
      label: 'English',
    },
    {
      key: 'ar',
      label: 'Arabic',
    },
  ];

  onChangeLang(e: DropdownChangeEvent) {
    console.log(e);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
