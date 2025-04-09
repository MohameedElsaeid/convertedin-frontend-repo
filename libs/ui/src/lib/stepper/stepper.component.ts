import {
  AfterContentInit,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { StepComponent } from './components/step/step.component';

@Component({
  selector: 'convertedin-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements AfterContentInit {
  //#region Declerations
  @HostBinding('class') class = 'w-full flex flex-column convertedin-stepper';
  @ContentChildren(StepComponent) steps!: QueryList<StepComponent>;

  @Input() nexButtonLabel: string = 'Next';
  @Input() backButtonLabel: string = 'Back';
  @Input() headerStyleClass!: string;
  @Input() nextButtonStyleClass!: string;
  @Input() backButtonStyleClass!: string;
  @Input() linear: boolean = true;
  @Input() nextBtnIcon?: string;
  @Input() backBtnIcon?: string;
  @Input() disableNextBtn: boolean = false;
  @Input() disableBackBtn: boolean = false;
  @Input() hideBackBtnOnFirstStep = false;
  @Output() activeIndexChange: EventEmitter<{
    index: number;
    completed: boolean;
    valid: boolean;
  }> = new EventEmitter();

  activeIndex: number = 0;
  activeStep!: StepComponent;
  //#endregion

  ngAfterContentInit(): void {
    this.indexChange();
  }

  //#region Methods
  indexChange(): void {
    this.activeStep = this.steps.get(this.activeIndex)!;
  }

  back(): void {
    const newIndex = this.activeIndex - 1;
    this.activeIndex = newIndex < 0 ? 0 : newIndex;
    this.indexChange();
    this.activeIndexChange.emit({
      completed: this.activeStep.completed,
      index: this.activeIndex,
      valid: this.activeStep.valid,
    });
  }

  next(): void {
    const newIndex = this.activeIndex + 1;
    this.activeIndex =
      newIndex > this.steps.length - 1 ? this.steps.length - 1 : newIndex;

    if (this.activeStep?.valid) {
      this.activeStep.completed = true;
    }
    this.indexChange();
    this.activeIndexChange.emit({
      completed: this.activeStep.completed,
      index: this.activeIndex,
      valid: this.activeStep.valid,
    });
  }

  jumpToStep(index: number, completed: boolean): void {
    if (!this.linear || completed) {
      this.activeIndex = index;
      this.indexChange();
      this.activeIndexChange.emit({
        completed: this.activeStep.completed,
        index: this.activeIndex,
        valid: this.activeStep.valid,
      });
    }
  }
  //#endregion
}
