import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TrimPipe } from '@redmose/shared/pipes';
import { FlowBuilderActionCardShellComponent } from '../../../../shared/components';
import { CreateWorkflowService } from '../../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-notification-action-card',
  templateUrl: './notification-action-card.component.html',
  styleUrls: ['./notification-action-card.component.scss'],
  standalone: true,
  imports: [
    FlowBuilderActionCardShellComponent,
    TrimPipe,
    CommonModule,
    TranslateModule,
  ],
})
export class FlowBuilderNotificationActionCardComponent implements OnInit {
  @HostBinding('class') class = 'w-full';
  @Input({ required: true }) index!: number;

  private __arabicRegex: RegExp = new RegExp(/[\u0600-\u06FF]/g);
  _formValue$!: Observable<any>;
  get _activeForm() {
    return this.__workflowService.selectedActionsFormArray.controls[
      this.index
    ] as FormGroup;
  }

  constructor(private __workflowService: CreateWorkflowService) {}

  ngOnInit(): void {
    this._formValue$ = this._activeForm.valueChanges.pipe(
      startWith(this._activeForm.value)
    );
  }

  deleteCard(): void {
    this.__workflowService.deleteAction(this.index);
  }

  getMessageDirection(message: string): 'ltr' | 'rtl' {
    return this.__arabicRegex.test(message) ? 'rtl' : 'ltr';
  }
}
