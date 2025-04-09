import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { FlowBuilderModes } from '../../../../../models';
import { CreateWorkflowService } from '../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-discard-popup',
  standalone: true,
  imports: [CommonModule, ButtonModule, TranslateModule],
  templateUrl: './discard-popup.component.html',
  styleUrls: ['./discard-popup.component.scss'],
})
export class FlowBuilderDiscardPopupComponent {
  constructor(
    private __ref: DynamicDialogRef,
    private __workflowService: CreateWorkflowService,
    private __activeRoute: ActivatedRoute,
    private __dialogData: DynamicDialogConfig
  ) {}

  close(): void {
    this.__ref.close();
  }

  discard(): void {
    this.__activeRoute.snapshot.data['mode'] === FlowBuilderModes.EDIT
      ? this.__dialogData.data.onDiscardEdit(
          parseInt(this.__activeRoute.snapshot.params['flowId'])
        )
      : this.__workflowService.discardWorkflow();

    this.close();
  }
}
