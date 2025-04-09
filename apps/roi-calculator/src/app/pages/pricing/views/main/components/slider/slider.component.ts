import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'convertedin-slider',
  standalone: true,
  imports: [CommonModule, SliderModule, FormsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
  value=0;
  readonly STEP = 25;
  @Output() onchangeStep = new EventEmitter<number>();

  get thumbPosition() {
    return `${this.value}%`;
  }

   stepMap = {
    0: '<$6,000',
    25: '$20,000',
    50: '$50,000',
    75: '$80,000',
    100: '>$100,000',
  };

  get stepText(): string {
    return this.stepMap[this.value as keyof typeof this.stepMap];
  }

  onSliderChange() {
    this.onchangeStep.next(this.value / this.STEP);
  }
}
