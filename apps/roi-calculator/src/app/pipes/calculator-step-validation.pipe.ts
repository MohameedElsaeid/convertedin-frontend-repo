import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';


@Pipe({
  name: 'calculatorStepValidation',
  standalone: true,
})

export class CalculatorStepValidationPipe implements PipeTransform {
  constructor(private __formDir: FormGroupDirective) {}

  transform(value: unknown, controlsName: string[]): unknown {
    // Added the arguments used for the pipe in the transform (value for the roiCalculator value and the controlNames for each control inside of the roiCalculator formGroup)
      const form = this.__formDir.form;
      return !controlsName.every((control) => {
        const formControl = form.get(control);
        return formControl ? formControl.valid : false;
      });    
  }
}
