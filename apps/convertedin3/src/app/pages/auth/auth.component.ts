import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnboardingHeaderComponent } from '@convertedin3/shared/components/onboarding-header/onboarding-header.component';
import { RouterOutlet } from '@angular/router';
import { AuthFooterComponent } from '@convertedin3/shared/components/auth-footer/auth-footer.component';

@Component({
  selector: 'convertedin-auth',
  standalone: true,
  imports: [CommonModule,OnboardingHeaderComponent,RouterOutlet,AuthFooterComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {}
