import { Component } from '@angular/core';
import { FooterComponent, NavBarComponent } from './components';
import { RouterOutlet } from '@angular/router';
import { CalenderComponent } from './components/calender/calender.component';

@Component({
  selector: 'convertedin-main-layout',
  standalone: true,
  imports: [NavBarComponent,FooterComponent,RouterOutlet,CalenderComponent],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {}