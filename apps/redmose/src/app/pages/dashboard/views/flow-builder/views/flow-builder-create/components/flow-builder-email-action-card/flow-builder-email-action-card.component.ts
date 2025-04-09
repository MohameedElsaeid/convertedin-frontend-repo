import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FlowBuilderActionCardShellComponent } from '../../shared/components';
import { Observable, startWith } from 'rxjs';
import { FormGroup } from '@angular/forms';
import {
  CreateWorkflowService,
  EmailWorkflow,
  EmailWorkflowService,
} from '../../shared/services';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-email-action-card',
  templateUrl: './flow-builder-email-action-card.component.html',
  styleUrls: ['./flow-builder-email-action-card.component.scss'],
  standalone: true,
  imports: [
    FlowBuilderActionCardShellComponent,
    CommonModule,
    ButtonModule,
    TranslateModule,
  ],
})
export class FlowBuilderEmailActionCardComponent implements OnInit {
  @HostBinding('class') class = 'w-full';

  @Input({ required: true }) index!: number;
  _formValue$!: Observable<any>;

  constructor(private __workflowService: CreateWorkflowService) {}

  get _activeForm() {
    return this.__workflowService.selectedActionsFormArray.at(this.index);
  }

  ngOnInit(): void {
    this._formValue$ = this._activeForm.valueChanges.pipe(
      startWith(this._activeForm.value)
    );
  }

  openPage() {
    this.__workflowService.setEmailActivePage({ activePage: 7 });
  }

  editEmail() {
    this.__workflowService.setEmailEditeActivePage(this.index);
  }
}
