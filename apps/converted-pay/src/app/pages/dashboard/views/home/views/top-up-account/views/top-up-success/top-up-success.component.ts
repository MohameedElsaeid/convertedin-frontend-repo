import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-top-up-success',
  standalone: true,
  imports: [CommonModule,RouterLink,TranslateModule],
  templateUrl: './top-up-success.component.html',
  styleUrls: ['./top-up-success.component.scss'],
})
export class TopUpSuccessComponent {}
