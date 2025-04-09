import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { MenuItem } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { MessageBinding } from '../../../../api';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ControlErrorsModule } from '@convertedin/ui';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'convertedin-message-content-buttons',
  templateUrl: './message-content-buttons.component.html',
  styleUrls: ['./message-content-buttons.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    MenuModule,
    ReactiveFormsModule,
    ControlErrorsModule,
    InputTextModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageContentButtonsComponent implements OnInit {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-wrap gap-2 mt-3';
  @Input({ required: true }) messageBindings!: Array<MessageBinding>;
  @Output() bindingAdd: EventEmitter<MessageBinding> = new EventEmitter();

  _showUrlInput$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  _menuItems!: Array<MenuItem>;
  _chipsItems!: Array<MessageBinding>;
  _form: FormGroup = this.__formBuilder.group({
    url: [
      '',
      [
        RxwebValidators.pattern({
          message: 'Wrong URL format',
          expression: {
            url: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(\/[\w-]*)*\/?(\?[\w-]+=[\w%]+&?)*#?([\w-]*)?$/,
          },
        }),
        RxwebValidators.required({ message: 'This field is required' }),
      ],
    ],
  });
  //#endregion

  constructor(private __formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._chipsItems = this.messageBindings.slice(0, 3);

    this._menuItems = this.messageBindings.slice(3).map((item) => ({
      label: item.name,
      command: () => {
        this.addMessageBinding(item);
      },
    }));
  }

  //#region Methods
  addTrackUrl(message: MessageBinding): void {
    if (this._form.valid) {
      this.bindingAdd.emit({
        ...message,
        parameter: this.updateParameterWithUrl(
          message.parameter,
          this._form.value.url
        ),
      });
      this.toggleInput();
    } else {
      this._form.markAllAsTouched();
    }
  }

  updateParameterWithUrl(parameter: string, url: string): string {
    return (
      parameter.slice(0, parameter.indexOf('}')) +
      ':' +
      url +
      parameter.slice(parameter.indexOf('}'))
    );
  }

  toggleInput(): void {
    this._showUrlInput$.next(!this._showUrlInput$.value);
  }

  addMessageBinding(message: MessageBinding): void {
    this.bindingAdd.emit(message);
  }
  //#endregion
}
