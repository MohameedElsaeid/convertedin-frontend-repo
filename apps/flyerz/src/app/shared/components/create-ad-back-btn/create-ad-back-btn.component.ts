import { Component, HostBinding, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'convertedin-create-ad-back-btn',
  standalone: true,
  imports: [ButtonModule, TranslateModule, RouterLink],
  templateUrl: './create-ad-back-btn.component.html',
  styleUrls: ['./create-ad-back-btn.component.scss'],
})
export class CreateAdBackBtnComponent {
  @HostBinding('class') class = 'absolute create-ad__home-btn';
  @HostBinding('class.right') get right() {
    return this.dir === 'rtl';
  }
  @HostBinding('class.left') get left() {
    return this.dir === 'ltr';
  }

  @Input() route: string = '/my-dashboard';

  get dir() {
    return document.documentElement.dir;
  }
}
