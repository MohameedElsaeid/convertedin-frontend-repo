import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FlowAction } from '@redmose/shared/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectTriggers } from '@redmose/store/flow-builder';
import { CreateWorkflowService } from '../../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-trigger-action-card',
  templateUrl: './trigger-action-card.component.html',
  styleUrls: ['./trigger-action-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ButtonModule, CommonModule, TranslateModule],
})
export class FlowBuilderTriggerActionCardComponent implements OnInit {
  @HostBinding('class') class = 'w-full';
  _formValue$!: Observable<any>;
  _startStopActions$!: Observable<Array<FlowAction>>;
  get _activeForm() {
    return this.__workflowService.selectedActionsFormArray
      .controls[0] as FormGroup;
  }
  get formVal() {
    return this._activeForm.value;
  }

  constructor(
    private __workflowService: CreateWorkflowService,
    private __store: Store
  ) {}

  ngOnInit(): void {
    this._formValue$ = this._activeForm.valueChanges.pipe(
      startWith(this._activeForm.value)
    );

    this._startStopActions$ = this.__store.select(selectTriggers);
  }

  findAction(array: Array<FlowAction>, id: number): FlowAction {
    return array.find((item) => item.id === id);
  }
}
