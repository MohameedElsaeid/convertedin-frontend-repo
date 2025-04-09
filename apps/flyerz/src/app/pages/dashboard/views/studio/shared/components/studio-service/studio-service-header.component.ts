import { Component, HostBinding, Input } from '@angular/core';
import { studioServiceImports } from './imports';

@Component({
  selector: 'convertedin-studio-service-header',
  standalone: true,
  imports: studioServiceImports,
  templateUrl: './studio-service-header.component.html',
  styleUrls: ['./studio-service-header.component.scss'],
})
export class StudioServiceHeaderComponent {
  @HostBinding('class') class = 'flex flex-column';
  @Input({ required: true }) mode!: 'image' | 'video';
}
