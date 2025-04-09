import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { Location, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: '[convertedin-back-button]',
  standalone: true,
  imports: [TranslateModule, NgIf],
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  @HostBinding('class') class =
    'flyerz__navigate-btn p-button-secondary p-button-text flex gap-4 align-items-center cursor-pointer p-component';
  @HostListener('click') onClick() {
    this.goBack();
  }
  @Input() showTitle: boolean = false;

  get activeDir() {
    return document.documentElement.dir;
  }

  constructor(private __location: Location) {}

  goBack(): void {
    this.__location.back();
  }
}
