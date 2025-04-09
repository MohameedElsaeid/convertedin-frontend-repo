import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { BehaviorSubject, take } from 'rxjs';
import { CreateWorkflowService } from '../../shared/services';
import { WorkFlowAction } from '@redmose/shared/api';
import { ErrorService } from '@redmose/shared/services';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { selectUserData } from '@redmose/store/app';
import { DialogService } from 'primeng/dynamicdialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-form-builder-add-action',
  templateUrl: './form-builder-add-action.component.html',
  styleUrls: ['./form-builder-add-action.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    DividerModule,
    // FlowBuilderPickerComponent,
    CommonModule,
    MenuModule,
    ButtonModule,
  ],
})
export class FormBuilderAddActionComponent {
  //#region Declerations
  @Input({ required: true }) index!: number;
  @Input() showAddButton: boolean = true;
  @HostBinding('class') class = 'my-3';
  _showActionPicker$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  channelConfigMap = {
    [WorkFlowAction.EMAIL]: 'isStoreEmailConfigCompleted',
    [WorkFlowAction.NOTIFICATION]: 'isStorePushConfigCompleted',
    [WorkFlowAction.SMS]: 'isStoreSmsConfigCompleted',
  };

  actions: MenuItem[] = [
    {
      label: `<div class='flex gap-2 align-items-center'>
          <img style='height:20px;width:20px' src='app-assets/icons/flow-builder/delay.svg' alt='delay-icon'/>
          <span class='workflow__add-lbl'>${this.__translate.instant(
            'automation.delay'
          )}</span>
        </div>`,
      escape: false,
      command: () => {
        this.addNewAction(WorkFlowAction.DELAY);
      },
    },
    {
      label: `<div class='flex gap-2 align-items-center'>
          <img style='height:20px;width:20px' src='app-assets/icons/flow-builder/letter.svg' alt='email-icon'/>
          <span class='workflow__add-lbl'>${this.__translate.instant(
            'automation.email'
          )}</span>
        </div>`,
      escape: false,
      // disabled: true,
      command: () => {
        this.addNewAction(WorkFlowAction.EMAIL);
      },
    },
    {
      label: `<div class='flex gap-2 align-items-center'>
          <img style='height:20px;width:20px' src='app-assets/icons/flow-builder/msg.svg' alt='sms-icon'/>
          <span class='workflow__add-lbl'>${this.__translate.instant(
            'automation.sms'
          )}</span>
        </div>`,
      escape: false,
      command: () => {
        this.addNewAction(WorkFlowAction.SMS);
      },
    },
    {
      label: `<div class='flex gap-2 align-items-center'>
          <img style='height:20px;width:20px' src='app-assets/icons/flow-builder/bell.svg' alt='notification-icon'/>
          <span class='workflow__add-lbl'>${this.__translate.instant(
            'automation.notifications'
          )}</span>
        </div>`,
      escape: false,
      // disabled: true,
      command: () => {
        this.addNewAction(WorkFlowAction.NOTIFICATION);
      },
    },
  ];
  //#endregion

  constructor(
    private __workflowService: CreateWorkflowService,
    private __messageService: ErrorService,
    private __dialog: DialogService,
    private __store: Store,
    private __translate: TranslateService
  ) {}

  //#region Methods
  toggleShowAction(): void {
    this._showActionPicker$.next(!this._showActionPicker$.value);
  }

  addNewAction(event: WorkFlowAction): void {
    // if (!this.__workflowService.selectedActionsFormArray.controls[0].valid) {
    //   this.__messageService.displayToastError(
    //     'Please fill trigger configuration before adding action'
    //   );
    // } else
    if (event === WorkFlowAction.DELAY && this.canAddDelay()) {
      this.__messageService.displayToastError(
        'Consecutive delays cannot be added',
        'Please update existing delay with your config'
      );
    } else if (
      event === WorkFlowAction.EMAIL ||
      event === WorkFlowAction.NOTIFICATION ||
      event === WorkFlowAction.SMS
    ) {
      this.checkUserConfig(event);
    } else {
      this.setNewAction(event);
    }
    this._showActionPicker$.next(false);
  }

  isLast(): boolean {
    return (
      this.__workflowService.selectedActionsFormArray.length === this.index + 1
    );
  }

  canAddDelay(): boolean {
    return (
      this.__workflowService.selectedActionsFormArray.controls[this.index]
        ?.value?.type === WorkFlowAction.DELAY ||
      this.__workflowService.selectedActionsFormArray.controls[this.index + 1]
        ?.value?.type === WorkFlowAction.DELAY
    );
  }

  
  checkUserConfig(event: WorkFlowAction): void {
    this.__store
      .select(selectUserData)
      .pipe(take(1))
      .subscribe((data) => {
        const configKey = this.channelConfigMap[event];

        if (configKey && !data[configKey]) {
          this.openMissingConfigPopup(event);
        } else{
          this.setNewAction(event);
        }
      });
  }

  openMissingConfigPopup(type: WorkFlowAction): void {
    import(
      '../popups/missing-config-popup/missing-config-popup.component'
    ).then((component) => {
      this.__dialog.open(component.FlowBuilderMissingConfigPopupComponent, {
        styleClass: 'missing-config-banner',
        data: {
          configType: type,
          onConfigComplete: () => {
            this.setNewAction(type);
          },
        },
      });
    });
  }

  setNewAction(type: WorkFlowAction): void {
    this.__workflowService.addNewAction(this.index, type);
    this.__workflowService.setActiveAction({ type, index: this.index + 1 });
  }

  // ngOnInit(): void {
  //   // this.addNewAction(WorkFlowAction.EMAIL);
  // }
  //#endregion
}
