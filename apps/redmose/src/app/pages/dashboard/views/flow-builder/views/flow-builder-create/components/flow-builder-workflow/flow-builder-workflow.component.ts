import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { CreateWorkflowService } from '../../shared/services';
import { FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { WorkFlowAction } from '@redmose/shared/api';
import { workflowImports } from './imports';

@Component({
  selector: 'convertedin-flow-builder-workflow',
  templateUrl: './flow-builder-workflow.component.html',
  styleUrls: ['./flow-builder-workflow.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: workflowImports,
})
export class FlowBuilderWorkflowComponent implements OnDestroy {
  //#region Declerations
  @HostBinding('class') class =
    'flex flex-column align-items-center max-h-full h-full relative';

  private __unsubscriber: Subject<void> = new Subject();

  get actions() {
    return WorkFlowAction;
  }

  get actionsForm() {
    return this.__workflowService.selectedActionsForm;
  }

  get actionsFormArray() {
    return this.__workflowService.selectedActionsFormArray as FormArray;
  }
  //#endregion

  constructor(private __workflowService: CreateWorkflowService) {}

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  setActiveAction(action: WorkFlowAction, index: number): void {
    this.__workflowService.setActiveAction({
      type: action,
      index,
    });
  }

  getActionType(index: number): WorkFlowAction {
    return this.__workflowService.selectedActionsFormArray.controls[index].get(
      'type'
    ).value;
  }

  workflowTrackBy(index: number, control: any): number {
    return index;
  }

  //#endregion
}
