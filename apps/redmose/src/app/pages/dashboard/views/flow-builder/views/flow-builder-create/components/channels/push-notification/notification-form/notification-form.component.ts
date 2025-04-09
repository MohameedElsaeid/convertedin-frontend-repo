import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { ControlErrorsModule } from '@convertedin/ui';
import { FlowBuilderApi } from '@redmose/shared/api';
import {
  MessageContentComponent,
  SpinnerComponent,
} from '@redmose/shared/components';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, catchError, finalize, of } from 'rxjs';
import { CreateWorkflowService } from '../../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-notification-form',
  templateUrl: './notification-form.component.html',
  styleUrls: ['./notification-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ControlErrorsModule,
    MessageContentComponent,
    ReactiveFormsModule,
    SpinnerComponent,
    TranslateModule,
  ],
})
export class FlowBuilderNotificationFormComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column';
  _form!: FormGroup;
  _parameters$: Observable<any>;
  _showSpinner: boolean = true;

  constructor(
    private __formDir: FormGroupDirective,
    private __workflowApi: FlowBuilderApi,
    private __workflowService: CreateWorkflowService
  ) {}

  ngOnInit(): void {
    this._form = this.__formDir.control;

    this._parameters$ = this.__workflowApi
      .fetchPredefinedParameters(
        this.__workflowService.selectedActionsFormArray.controls[0].value
          .start_condition
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return of({ data: [] });
        }),
        finalize(() => {
          this._showSpinner = false;
        })
      );
  }
}
