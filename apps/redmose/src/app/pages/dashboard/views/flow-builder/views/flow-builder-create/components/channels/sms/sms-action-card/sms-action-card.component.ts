import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { TrimPipe } from '@redmose/shared/pipes';
import { CommonModule } from '@angular/common';
import { FlowBuilderActionCardShellComponent } from '../../../../shared/components';
import { CreateWorkflowService } from '../../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-sms-action-card',
  templateUrl: './sms-action-card.component.html',
  styleUrls: ['./sms-action-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FlowBuilderActionCardShellComponent,
    TrimPipe,
    CommonModule,
    TranslateModule,
  ],
})
export class FlowBuilderSmsActionCardComponent implements OnInit {
  @Input({ required: true }) index!: number;
  @HostBinding('class') class = 'w-full';

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
