import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';
import { selectBusinessCardImports } from './imports';
import { BrandLocation } from '@pinads/shared/api/brand';
import { TooltipOptions } from 'primeng/api';
@Component({
  selector: 'select-business-card',
  templateUrl: './select-business-card.component.html',
  styleUrls: ['./select-business-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: selectBusinessCardImports,
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class SelectBusinessCardComponent {
  @Input() business!: BrandLocation;
  @Input() controlName = 'selectedBusiness';
  @Output() selectBusiness = new EventEmitter<BrandLocation>();

  get tooltipOptions(): TooltipOptions {
    return this.isDisabled ? { disabled: false ,tooltipPosition:'top'} : {disabled: true};
  }
  @HostBinding('class.active')
  get isActive() {
    return this.formControl.value === this.business.id;
  }

  @HostBinding('class.disabled') get isDisabled() {
    return !this.business.has_access;
  }

  click() {
    this.formControl.patchValue(this.business.id);
    this.selectBusiness.emit(this.business);
  }

  get locationText() {
    const postal_address = this.business.postal_address;
    if (!postal_address?.addressLines) return '';
    return postal_address
      ? `${postal_address.addressLines?.join(', ')}, ${postal_address.locality}`
      : '';
  }

  get formControl() {
    return this.parentControl.control.controls[this.controlName];
  }
  constructor(private parentControl: FormGroupDirective) {}
}
