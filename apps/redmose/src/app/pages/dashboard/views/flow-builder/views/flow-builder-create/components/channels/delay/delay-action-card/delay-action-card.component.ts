import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirstLetterPipe } from '@redmose/shared/pipes';
import { CreateWorkflowService } from '../../../../shared/services';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-delay-action-card',
  templateUrl: './delay-action-card.component.html',
  styleUrls: ['./delay-action-card.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, FirstLetterPipe, TranslateModule],
})
export class FlowBuilderDelayActionCardComponent implements OnInit {
  _activeForm!: FormGroup;
  _formValue$!: Observable<any>;

  @Input({ required: true }) index!: number;
  @HostBinding('class') class =
    'workflow__delay-card flex gap-2 align-items-center cursor-pointer';

  @HostBinding('class.workflow__delay-error') get hasError(): boolean {
    return (
      this._activeForm && this._activeForm.touched && !this._activeForm?.valid
    );
  }

  constructor(private __workflowService: CreateWorkflowService) {}

  ngOnInit(): void {
    this._activeForm = this.__workflowService.selectedActionsFormArray.controls[
      this.index
    ] as FormGroup;

    this._formValue$ = this._activeForm.valueChanges.pipe(
      startWith(this._activeForm.value)
    );
  }

  deleteCard(): void {
    this.__workflowService.deleteAction(this.index);
  }
}
