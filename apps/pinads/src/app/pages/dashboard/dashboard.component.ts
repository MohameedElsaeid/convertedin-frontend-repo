import { Component } from '@angular/core';
import {
  DashboardSidenavComponent,
  DashboardHeaderComponent,
  DashboardMobileHeaderComponent,
} from './components';
import { RouterOutlet } from '@angular/router';
import { ProvideAuthService } from '@pinads/shared/api/auth';

@Component({
  selector: 'convertedin-dashboard',
  standalone: true,
  imports: [
    DashboardSidenavComponent,
    DashboardHeaderComponent,
    DashboardMobileHeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class: 'flex h-full',
  },
  providers:[ProvideAuthService()]
})
export class DashboardComponent {}
