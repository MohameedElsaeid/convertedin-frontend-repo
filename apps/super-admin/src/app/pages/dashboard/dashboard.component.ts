import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DashboardSidebarComponent } from './components';

@Component({
  selector: 'convertedin-dashboard',
  standalone: true,
  imports: [DashboardSidebarComponent, RouterOutlet,ButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host: {
    class: 'max-h-screen flex h-full',
  },
})
export class DashboardComponent {

}
