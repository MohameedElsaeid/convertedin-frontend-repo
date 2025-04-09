import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideAdsApi } from '@flyerz/shared/api';

@Component({
  selector: 'convertedin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [RouterOutlet],
  providers: [provideAdsApi()],
})
export class HomeComponent {
  @HostBinding('class') class = 'flex flex-column flex-grow-1 max-h-full';
}
