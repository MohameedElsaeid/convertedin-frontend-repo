import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { CreateWorkflowService } from './shared/services';
import { ActivatedRoute } from '@angular/router';
import { FlowAction, FlowBuilderApi, Workflow } from '@redmose/shared/api';
import { FlowBuilderModes } from '../../models';
import { BehaviorSubject, Observable, finalize, tap } from 'rxjs';
import { FlowBuilderSidebarComponent } from './components/flow-builder-sidebar/flow-builder-sidebar.component';
import { FlowBuilderWorkflowComponent } from './components/flow-builder-workflow/flow-builder-workflow.component';
import { SpinnerComponent } from '@redmose/shared/components';
import { CommonModule } from '@angular/common';
import { FlowBuilderHeaderComponent } from './components/flow-builder-header/flow-builder-header.component';
import { Store } from '@ngrx/store';
import { flowBuilderActions } from '@redmose/store/flow-builder';
import { DialogService } from 'primeng/dynamicdialog';
import { FlowBuilderApiService } from '@redmose/shared/api/flow-builder/services/flow-builder.service';

@Component({
  selector: 'convertedin-flow-builder-create',
  templateUrl: './flow-builder-create.component.html',
  styleUrls: ['./flow-builder-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FlowBuilderSidebarComponent,
    FlowBuilderWorkflowComponent,
    SpinnerComponent,
    CommonModule,
    FlowBuilderHeaderComponent,
  ],
  providers: [CreateWorkflowService, DialogService,FlowBuilderApiService],
})
export class FlowBuilderCreateComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column flex-grow-1 flow-builder';

  get showSideNav() {
    return this.__workflow.activeActionValue;
  }
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  flow$!: Observable<Workflow>;
  actionList$: Observable<Array<FlowAction>>;

  constructor(
    private __workflow: CreateWorkflowService,
    private __activeRoute: ActivatedRoute,
    private __flowBuilderApi: FlowBuilderApi,
    private __store: Store
  ) {}

  ngOnInit(): void {
    this.getTriggers();

    if (this.__activeRoute.snapshot.data['mode'] === FlowBuilderModes.EDIT) {
      this.getFlowData(parseInt(this.__activeRoute.snapshot.params['flowId']));
    } else {
      const templateId =
        this.__activeRoute.snapshot.queryParams['flowTemplate'];
      if (templateId) {
        this.getFlowTemplate(templateId);
      } else {
        this.__workflow.initWorkflowForm();
        this.isLoading.next(false);
      }
    }
  }

  //#region Methods
  getFlowData(id: number): void {
    this.isLoading.next(true);
    this.flow$ = this.__flowBuilderApi.getFlow(id).pipe(
      tap((data) => {
        this.__workflow.initWorkflowForm(data);
      }),
      finalize(() => {
        this.isLoading.next(false);
      })
    );
  }

  getFlowTemplate(templateId: string): void {
    this.flow$ = this.__flowBuilderApi
      .getFlowTemplate(parseInt(templateId))
      .pipe(
        tap((data) => {
          this.__workflow.initWorkflowForm(data);
        }),
        finalize(() => {
          this.isLoading.next(false);
        })
      );
  }

  getTriggers(): void {
    this.actionList$ = this.__flowBuilderApi.fetchFlowStartStop().pipe(
      tap((data) => {
        this.__store.dispatch(
          flowBuilderActions.setFlowTriggers({ flowActions: data })
        );
      })
    );
  }
  //#endregion
}
