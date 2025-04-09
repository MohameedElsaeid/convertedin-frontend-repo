import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'convertedin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() title = '';
  @Input() subTitle = '';
   // Helper to check if the screen is small
   isSmallScreen(): boolean {
    return window.innerWidth <= 768;  // Adjust breakpoint for small screen
  }
}
