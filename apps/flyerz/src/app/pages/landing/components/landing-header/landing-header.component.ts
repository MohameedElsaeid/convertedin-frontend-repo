import { Component, HostBinding } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: '[convertedin-landing-header]',
  standalone: true,
  imports: [ButtonModule, TranslateModule, RouterLink],
  templateUrl: './landing-header.component.html',
  styleUrls: ['./landing-header.component.scss'],
})
export class LandingHeaderComponent {
  @HostBinding('class') class = 'flex flex-column align-items-center gap-3';
}
