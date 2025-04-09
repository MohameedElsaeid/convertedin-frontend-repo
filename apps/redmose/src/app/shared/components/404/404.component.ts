import { CommonModule } from '@angular/common';
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-404',
  standalone: true,
  templateUrl: './404.component.html',
  styleUrls: ['./404.component.scss'],
  imports: [TranslateModule,CommonModule],
})
export class NotFoundComponent {
  @HostBinding('class') class =
    'flex align-items-center justify-content-center';
    constructor(public route: ActivatedRoute) {}
}
