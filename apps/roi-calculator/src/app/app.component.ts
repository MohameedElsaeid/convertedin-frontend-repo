import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  standalone: true,
  imports: [RouterOutlet],
  selector: 'convertedin-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') class = 'flex flex-col flex-1';
}
