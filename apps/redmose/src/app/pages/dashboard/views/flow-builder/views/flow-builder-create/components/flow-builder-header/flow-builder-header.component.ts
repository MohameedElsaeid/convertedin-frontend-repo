import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FlowAction,
  FlowBuilderApi,
  WorkFlowAction,
} from '@redmose/shared/api';
import { ErrorService } from '@redmose/shared/services';
import { MessageService } from 'primeng/api';
import { Observable, Subject, finalize, takeUntil } from 'rxjs';
import { FlowBuilderModes } from '../../../../models';
import { CreateWorkflowService } from '../../shared/services';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ControlErrorsModule } from '@convertedin/ui';
import { DialogService } from 'primeng/dynamicdialog';
import { Store } from '@ngrx/store';
import { selectTriggers } from '@redmose/store/flow-builder';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    ControlErrorsModule,
    TranslateModule,
  ],
  templateUrl: './flow-builder-header.component.html',
  styleUrls: ['./flow-builder-header.component.scss'],
})
export class FlowBuilderHeaderComponent implements OnInit, OnDestroy {
  //#region Declerations
  @HostBinding('class') class = 'py-3 px-5 bg-white workflow__header';
  @Input() flowName!: string;
  @Output() resetEdit: EventEmitter<number> = new EventEmitter();

  triggers$!: Observable<Array<FlowAction>>;
  loaders = {
    publish: false,
    draft: false,
  };
  get actionsForm() {
    return this.__workflowService.selectedActionsForm;
  }
  get activeForm() {
    return this.__workflowService.selectedActionsFormArray
      .controls[0] as FormGroup;
  }
  private __unsubscriber: Subject<void> = new Subject();
  //#endregion

  constructor(
    private __workflowService: CreateWorkflowService,
    private __workflowApi: FlowBuilderApi,
    private __toast: MessageService,
    private __errorService: ErrorService,
    private __router: Router,
    private __activeRoute: ActivatedRoute,
    private __dialog: DialogService,
    private __store: Store,
    private __translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.triggers$ = this.__store.select(selectTriggers);
  }

  ngOnDestroy(): void {
    this.__unsubscriber.next();
    this.__unsubscriber.complete();
  }

  //#region Methods
  submitWorkFlow(triggers: Array<FlowAction>): void {
    if (!this.actionsForm.valid) {
      this.actionsForm.markAllAsTouched();
      this.__errorService.displayToastError(
        'Please fill all data before submission'
      );
    } else if (
      this.__workflowService.selectedActionsFormArray.value?.length === 1 ||
      (this.__workflowService.selectedActionsFormArray.value?.length === 2 &&
        this.__workflowService.selectedActionsFormArray.value[1]?.type ===
          WorkFlowAction.DELAY)
    ) {
      this.__errorService.displayToastError('Please add steps to the flow.');
    } else if (this.hasDisabledTriggers(triggers)) {
      this.__errorService.displayToastError('Please select a trigger');
    } else {
      this.__activeRoute.snapshot.data['mode'] === FlowBuilderModes.CREATE
        ? this.postWorkflow()
        : this.updateWorkflow();
    }
  }

  saveDraft(): void {
    this.__activeRoute.snapshot.data['mode'] === FlowBuilderModes.CREATE
      ? this.postWorkflow(0, 1)
      : this.updateWorkflow(1);
  }

  postWorkflow(published: 0 | 1 = 1, is_draft: 0 | 1 = 0): void {
    is_draft ? (this.loaders.draft = true) : (this.loaders.publish = true);
    this.__workflowApi
      .createWorkflow({
        ...this.__workflowApi.mapWorkflow(
          this.__workflowService.selectedActionsForm.value
        ),
        published,
        is_draft,
      })
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          is_draft
            ? (this.loaders.draft = false)
            : (this.loaders.publish = false);
        })
      )
      .subscribe(() => {
        this.__toast.add({
          key: 'cin-toast',
          severity: 'success',
          summary: 'Workflow created',
        });
        this.__router.navigate(['/dashboards/flow-builder']);
      });
  }

  updateWorkflow(is_draft: 0 | 1 = 0): void {
    is_draft ? (this.loaders.draft = true) : (this.loaders.publish = true);

    this.__workflowApi
      .updateFlow(
        {
          ...this.__workflowApi.mapWorkflow(
            this.__workflowService.selectedActionsForm.value
          ),
          is_draft,
          // name: this.form.value.name,
        },
        parseInt(this.__activeRoute.snapshot.params['flowId'])
      )
      .pipe(
        takeUntil(this.__unsubscriber),
        finalize(() => {
          is_draft
            ? (this.loaders.draft = false)
            : (this.loaders.publish = false);
        })
      )
      .subscribe(() => {
        this.__toast.add({
          key: 'cin-toast',
          severity: 'success',
          summary: 'Workflow updated',
        });
        this.__router.navigate(['/dashboards/flow-builder']);
      });
  }

  discardWorkflow(): void {
    import('../popups/discard-popup/discard-popup.component').then(
      (component) => {
        this.__dialog.open(component.FlowBuilderDiscardPopupComponent, {
          header: this.__translate.instant('automation.discard-header'),
          data: {
            onDiscardEdit: (flowId: number) => {
              this.resetEdit.emit(flowId);
            },
          },
        });
      }
    );
  }

  hasDisabledTriggers(triggers: Array<FlowAction>): boolean {
    return triggers.some(
      (item) =>
        (item.id ===
          this.__workflowService.selectedActionsFormArray.value[0]
            ?.start_condition ||
          item.id ===
            this.__workflowService.selectedActionsFormArray.value[0]
              ?.stop_condition) &&
        !item.status
    );
  }
  //#endregion
}
