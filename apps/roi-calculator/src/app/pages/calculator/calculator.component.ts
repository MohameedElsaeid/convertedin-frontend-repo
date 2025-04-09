import { Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { IntroductionComponent, RoiComponent } from './components';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'convertedin-calculator',
  standalone: true,
  imports: [CommonModule, RoiComponent,IntroductionComponent,RouterLink],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {}
