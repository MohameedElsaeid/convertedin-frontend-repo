import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { provideAuthApi } from '@converted-pay/shared/api';

@Component({
  selector: 'convertedin-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [provideAuthApi()],
})
export class AuthComponent {}
