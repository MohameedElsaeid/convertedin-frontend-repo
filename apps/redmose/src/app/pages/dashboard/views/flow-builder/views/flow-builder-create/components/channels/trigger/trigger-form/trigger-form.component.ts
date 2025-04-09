import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { FlowAction, FlowActionType } from '@redmose/shared/api';
import { ControlErrorsModule } from '@convertedin/ui';
import { DropdownModule } from 'primeng/dropdown';
import { SpinnerComponent } from '@redmose/shared/components';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { Store } from '@ngrx/store';
import { selectTriggers } from '@redmose/store/flow-builder';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { FlowBuilderPeriodComponent } from '../../../../shared/components';
import { CreateWorkflowService } from '../../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-trigger-form',
  templateUrl: './trigger-form.component.html',
  styleUrls: ['./trigger-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ControlErrorsModule,
    DropdownModule,
    SpinnerComponent,
    CommonModule,
    InputSwitchModule,
    FormsModule,
    FlowBuilderPeriodComponent,
    TooltipModule,
    DividerModule,
    InputTextModule,
    TranslateModule,
  ],
})
export class FlowBuilderTriggerFormComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column';

  _actionList$!: Observable<Array<FlowAction>>;
  _form!: FormGroup;
  _frequencyEnabled: boolean = false;
  get _actionsType() {
    return FlowActionType;
  }
  //#endregion

  constructor(
    private __formDir: FormGroupDirective,
    private __workflowService: CreateWorkflowService,
    private __store: Store
  ) {}

  ngOnInit(): void {
    this._form = this.__formDir.control;

    this._actionList$ = this.__store.select(selectTriggers).pipe(
      tap((data) => {
        if (
          data?.find(
            (item) =>
              item.id === this._form.value['start_condition'] && !item.status
          )
        ) {
          this._form.controls['start_condition'].setValue(null);
        }
        if (
          data?.find(
            (item) =>
              item.id === this._form.value['stop_condition'] && !item.status
          )
        ) {
          this._form.controls['stop_condition'].setValue(null);
        }
      })
    );

    this._frequencyEnabled = this._form.contains('send_after');
  }

  //#region Methods
  frequencyChange(): void {
    this._frequencyEnabled
      ? this.__workflowService.addPeriodToForm(this._form)
      : this.__workflowService.removePeriodFromForm(this._form);
  }

  filterByAction(
    action: FlowActionType,
    list: Array<FlowAction>
  ): Array<FlowAction> {
    return list.filter((item) => item.type === action);
  }

  getSelectedItem(id: number, list: Array<FlowAction>): FlowAction {
    return list.find((item) => item.id === id)!;
  }

  checkValue(event: any, actions: FlowAction[], key: string): void {
    if (!this.getSelectedItem(event.value, actions)?.status) {
      this._form.controls[key].setValue(null);
    }
  }
  //#endregion
}
