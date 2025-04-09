import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'convertedin-warning-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './warning-banner.component.html',
  styleUrls: ['./warning-banner.component.scss'],
  host:{
    class:'flex gap-3 align-items-center p-3 border-round-lg justify-content-between'
  }
})
export class WarningBannerComponent {
  @Input() title!:string
  @Input() subtitle!:string
}
