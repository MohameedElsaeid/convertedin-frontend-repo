import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'convertedin-facebook-ad-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './facebook-ad-preview.component.html',
  styleUrls: ['./facebook-ad-preview.component.scss'],
})
export class FacebookAdPreviewComponent {
  @HostBinding('class') class = 'flyerz__facebook-ad-preview';

  @Input() pageName!: string;
  @Input() pageImage!: string;
  @Input() postTitle!: string;
  @Input() postImage: string = 'assets/images/thumb.png';
  @Input() postAddress!: string;
  @Input() postDescription!: string;
  @Input() url!: string;
}
