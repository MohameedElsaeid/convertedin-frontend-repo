import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { TooltipOptions } from 'primeng/api';

@Component({
  selector: 'convertedin-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
})
export class StepComponent {
  @Input() title!: string;
  @Input() valid: boolean = false;
  @Input() nextBtnTooltip!: string;
  @Input() nextBtnTooltipOption!: TooltipOptions;
  @Input() completedIcon: string = 'pi pi-check';
  @ContentChild('content') content!: TemplateRef<any>;

  completed: boolean = false;
}
