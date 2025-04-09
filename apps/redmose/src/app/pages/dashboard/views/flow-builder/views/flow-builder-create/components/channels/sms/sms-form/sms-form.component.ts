import { Component, HostBinding, OnInit } from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, catchError, finalize, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FlowBuilderApi } from '@redmose/shared/api';
import { CommonModule } from '@angular/common';
import { ControlErrorsModule } from '@convertedin/ui';
import {
  MessageContentComponent,
  SpinnerComponent,
} from '@redmose/shared/components';
import { InputTextModule } from 'primeng/inputtext';
import { CreateWorkflowService } from '../../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-sms-form',
  templateUrl: './sms-form.component.html',
  styleUrls: ['./sms-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    ControlErrorsModule,
    MessageContentComponent,
    SpinnerComponent,
    InputTextModule,
    TranslateModule,
  ],
})
export class FlowBuilderSmsFormComponent implements OnInit {
  @HostBinding('class') class = 'flex flex-column';
  _form!: FormGroup;
  _parameters$: Observable<any>;
  _showSpinner: boolean = true;

  constructor(
    private __formDir: FormGroupDirective,
    private __workflowService: CreateWorkflowService,
    private __workflowApi: FlowBuilderApi
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
