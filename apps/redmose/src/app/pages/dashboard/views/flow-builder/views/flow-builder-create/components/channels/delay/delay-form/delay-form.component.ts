import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { FlowBuilderPeriodComponent } from '../../../../shared/components';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-flow-builder-delay-form',
  templateUrl: './delay-form.component.html',
  styleUrls: ['./delay-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ReactiveFormsModule, FlowBuilderPeriodComponent, TranslateModule],
})
export class FlowBuilderDelayFormComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column';

  _form!: FormGroup;
  //#endregion

  constructor(private __formDir: FormGroupDirective) {}

  ngOnInit(): void {
    this._form = this.__formDir.control;
  }
}
