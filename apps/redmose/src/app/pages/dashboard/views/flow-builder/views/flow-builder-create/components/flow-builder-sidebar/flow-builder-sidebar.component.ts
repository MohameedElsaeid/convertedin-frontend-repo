import { Component, HostBinding, OnInit } from '@angular/core';
import { CreateWorkflowService } from '../../shared/services';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActiveAction, SideBarHeaderData } from '../../models/interfaces';
import { Observable, tap } from 'rxjs';
import { ChangeDetectionStrategy } from '@angular/core';
import { SuitableMessageInterface, WorkFlowAction } from '@redmose/shared/api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FlowBuilderEmailFlowComponent } from '../flow-builder-email-flow/flow-builder-email-flow.component';
import {
  FlowBuilderDelayFormComponent,
  FlowBuilderSmsFormComponent,
  FlowBuilderNotificationFormComponent,
  FlowBuilderTriggerFormComponent,
} from '../channels';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FlowBuilderApiService } from '@redmose/shared/api/flow-builder/services/flow-builder.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'convertedin-flow-builder-sidebar',
  templateUrl: './flow-builder-sidebar.component.html',
  styleUrls: ['./flow-builder-sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FlowBuilderDelayFormComponent,
    FlowBuilderSmsFormComponent,
    FlowBuilderNotificationFormComponent,
    FlowBuilderTriggerFormComponent,
    FlowBuilderEmailFlowComponent,
    TranslateModule,
  ],
})
export class FlowBuilderSidebarComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'w-4 flex flex-column relative flow-sidenav';
  get actions() {
    return WorkFlowAction;
  }

  private readonly __titles: { [key: string]: SideBarHeaderData } = {
    [WorkFlowAction.DELAY]: {
      title: this.__translate.instant('automation.delay'),
      logo: 'app-assets/icons/flow-builder/delay.svg',
    },
    [WorkFlowAction.EMAIL]: {
      title: this.__translate.instant('automation.email'),
      logo: 'app-assets/icons/flow-builder/letter.svg',
    },
    [WorkFlowAction.TRIGGER]: {
      title: this.__translate.instant('automation.trigger'),
      logo: 'app-assets/icons/flow-builder/trigger.svg',
    },
    [WorkFlowAction.SMS]: {
      title: this.__translate.instant('automation.sms'),
      logo: 'app-assets/icons/flow-builder/msg.svg',
    },
    [WorkFlowAction.NOTIFICATION]: {
      title: this.__translate.instant('automation.notifications'),
      logo: 'app-assets/icons/flow-builder/bell.svg',
    },
  };
  activeForm!: FormGroup | undefined;
  activeAction$!: Observable<ActiveAction>;
  previousType!: WorkFlowAction;
  isSubmitting$ = new BehaviorSubject<boolean>(false);
  //#endregion

  constructor(
    private __workflowService: CreateWorkflowService,
    private __translate: TranslateService,
    private __flowBuilderApiService: FlowBuilderApiService,
  ) {}

  ngOnInit(): void {
    this.getActiveForm();
  }

  //#region Methods
  getSideBarTitle(): string {
    return this.activeAction$
      ? this.__titles[this.__workflowService.activeActionValue?.type].title
      : '';
  }

  getSideBarLogo(): string {
    return this.activeAction$
      ? this.__titles[this.__workflowService.activeActionValue?.type].logo
      : '';
  }

  cancelFormEdit(): void {
    this.__workflowService.setActiveAction(undefined);
    this.activeForm = undefined;
  }

  deleteAction(index: number): void {
    this.__workflowService.deleteAction(index);
    this.cancelFormEdit();
  }

  updateActiveForm(): void {
    if (this.activeForm.invalid) {
      this.activeForm.markAllAsTouched();
      return;
    }
    
    this.isSubmitting$.next(true);

    if (this.activeForm.get('type').value === WorkFlowAction.SMS) {
      const message = this.activeForm.get('body').value.message;
      this.__flowBuilderApiService.checkMessageSuitability(message).subscribe({
        next: (result: SuitableMessageInterface) => {
          if (result.result) {
            this.__workflowService.updateExistingForm(this.activeForm);
          } else {
            this.activeForm.get('body').setErrors({messageSuitability: true});
            this.activeForm.updateValueAndValidity();
          }
          this.isSubmitting$.next(false);
        },
        error: (error) => {
          console.error('Error checking message suitability:', error);
          this.isSubmitting$.next(false);
        }
      });
    } else {
      this.__workflowService.updateExistingForm(this.activeForm);
      this.isSubmitting$.next(false);
    }
  }

  setNewForm(value: ActiveAction): void {
    this.activeForm = this.__workflowService.copyFormGroup(
      value.type,
      this.__workflowService.selectedActionsFormArray.controls[
        value.index
      ] as FormGroup
    );
  }

  getActiveForm(): void {
    this.activeAction$ = this.__workflowService.activeAction.pipe(
      tap((data) => {
        if (this.previousType && this.previousType === data?.type) {
          this.activeForm.patchValue({
            ...this.__workflowService.selectedActionsFormArray.controls[
              data.index
            ].value,
          });
        } else {
          data ? this.setNewForm(data) : (this.activeForm = undefined);
          this.previousType = data?.type;
        }
      })
    );
  }
  //#endregion
}
