import { NgClass } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ControlErrorsModule } from '@convertedin/ui';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PeriodType } from '@redmose/shared/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'convertedin-flow-builder-period',
  templateUrl: './flow-builder-period.component.html',
  styleUrls: ['./flow-builder-period.component.scss'],
  standalone: true,
  imports: [
    InputNumberModule,
    ReactiveFormsModule,
    NgClass,
    ControlErrorsModule,
    DropdownModule,
    TranslateModule,
  ],
})
export class FlowBuilderPeriodComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex gap-2';
  @Input({ required: true }) numberControlName!: string;
  @Input({ required: true }) typeControlName!: string;

  _form!: FormGroup;
  _periodsDropDown: Array<{ value: PeriodType; label: string }> = [
    {
      value: PeriodType.MINUTES,
      label: this.__translate.instant('Minutes'),
    },
    {
      value: PeriodType.HOURS,
      label: this.__translate.instant('Hours'),
    },
    {
      value: PeriodType.DAYS,
      label: this.__translate.instant('Days'),
    },
    // {
    //   value: PeriodType.WEEKS,
    //   label: 'Weeks',
    // },
  ];
  //#endregion

  constructor(
    private __formDir: FormGroupDirective,
    private __translate: TranslateService
  ) {}

  ngOnInit(): void {
    this._form = this.__formDir.control;
  }
}
