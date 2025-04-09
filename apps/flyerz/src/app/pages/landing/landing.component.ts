import { Component, HostBinding } from '@angular/core';
import { landingImports } from './imports';

@Component({
  selector: 'convertedin-landing',
  standalone: true,
  imports: landingImports,
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  @HostBinding('class') class = 'flex flex-column py-4 flex-grow-1 landing';
}
