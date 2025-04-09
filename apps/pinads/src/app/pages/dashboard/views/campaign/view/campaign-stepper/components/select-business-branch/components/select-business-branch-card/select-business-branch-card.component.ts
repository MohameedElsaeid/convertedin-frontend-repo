import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
} from '@angular/forms';
import { selectBusinessBranchCardImports } from './imports';
import { BrandLocation } from '@pinads/shared/api/brand';

@Component({
  selector: 'select-business-branch-card',
  templateUrl: './select-business-branch-card.component.html',
  styleUrls: ['./select-business-branch-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: selectBusinessBranchCardImports,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class SelectBusinessBranchCardComponent {
  @Input() branch!: BrandLocation;
  @Input() controlName = 'locations';
  @Input() defaultLocation!: string;
  @Output() onchangeBusiness = new EventEmitter<BrandLocation>();
  @HostBinding('class') styleClass =
    'flex justify-content-between align-items-center border-2 border-round-lg p-3';

  @HostBinding('class.active')
  get isActive() {
    return this.formControl.value.includes(this.branch?.id);
  }

  get formControl() {
    return this.parentControl.control.controls[this.controlName] as FormControl;
  }

  constructor(
    private parentControl: FormGroupDirective
  ) {}

  onChangeBusiness(branch: BrandLocation) {
    this.onchangeBusiness.emit(branch);
  }
}
