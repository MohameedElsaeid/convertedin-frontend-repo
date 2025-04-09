import { Component, HostBinding, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-create-ad-header',
  templateUrl: './create-ad-header.component.html',
  styleUrls: ['./create-ad-header.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class CreateAdHeaderComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) subtitle!: string;
  @HostBinding('class') class = 'flex flex-column align-items-center gap-1';
}
