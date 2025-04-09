import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'convertedin-control-errors',
  templateUrl: './control-errors.component.html',
  styleUrls: ['./control-errors.component.scss'],
})
export class ControlErrorsComponent {
  @Input() control!: AbstractControl;
  @Input() formSubmitted!: boolean;
  @Input() showOneOnly = false;

  get error() {
    return this.control.errors
      ? this.control.errors[Object.keys(this.control.errors)[0]]
      : '';
  }
}
