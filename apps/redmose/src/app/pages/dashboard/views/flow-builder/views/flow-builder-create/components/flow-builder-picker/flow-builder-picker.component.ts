import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Output,
} from '@angular/core';
import { WorkFlowAction } from '@redmose/shared/api';

@Component({
  selector: 'convertedin-flow-builder-picker',
  templateUrl: './flow-builder-picker.component.html',
  styleUrls: ['./flow-builder-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgFor],
})
export class FlowBuilderPickerComponent {
  //#region Declerations
  @HostBinding('class') class = 'absolute flex workflow__picker z-5';
  @Output() triggerAction: EventEmitter<WorkFlowAction> = new EventEmitter();

  actions: Array<{
    actionType: WorkFlowAction;
    img: string;
    title: string;
    disabled: boolean;
  }> = [
    {
      actionType: WorkFlowAction.DELAY,
      title: 'Delay',
      img: 'app-assets/icons/flow-builder/timer.svg',
      disabled: false,
    },
    {
      actionType: WorkFlowAction.EMAIL,
      title: 'Email',
      img: 'app-assets/icons/flow-builder/email.svg',
      disabled: true,
    },
    {
      actionType: WorkFlowAction.SMS,
      title: 'SMS',
      img: 'app-assets/icons/flow-builder/sms.svg',
      disabled: false,
    },
    {
      actionType: WorkFlowAction.NOTIFICATION,
      title: 'Notification',
      img: 'app-assets/icons/flow-builder/notification.svg',
      disabled: true,
    },
  ];
  //#endregion

  //#region Methods
  actionTrigger(action: WorkFlowAction): void {
    this.triggerAction.emit(action);
  }
  //#endregion
}
