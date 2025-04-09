import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepComponent } from './components/step/step.component';
import { StepperComponent } from './stepper.component';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [StepComponent, StepperComponent],
  imports: [CommonModule, ButtonModule,TooltipModule],
  exports: [StepComponent, StepperComponent],
})
export class StepperModule {}
