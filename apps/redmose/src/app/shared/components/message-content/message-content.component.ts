import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import * as GsmCharsetUtils from '@trt2/gsm-charset-utils';
import { MessageBinding } from '../../api';
import { CommonModule } from '@angular/common';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessageContentService } from './services/message-contant.service';
import {
  MessageContentButtonsComponent,
  MessageGenerateWithAiComponent,
} from './components';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MessageContentButtonsComponent,
    InputTextareaModule,
    MessageGenerateWithAiComponent,
    TranslateModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MessageContentComponent),
      multi: true,
    },
    MessageContentService,
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageContentComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  //#region Declerations
  @Input() messageBindings: Array<MessageBinding> = [];
  @Input() hasError: boolean = false;
  @Input() showMsgCount: boolean = true;
  @Input() showEnhanceWithAi: boolean = true;
  @HostBinding('class') class = 'w-full';
  @ViewChild('textarea') textarea!: ElementRef;

  _langDir$: BehaviorSubject<'ltr' | 'rtl'> = new BehaviorSubject(
    document.documentElement.dir as 'ltr' | 'rtl'
  );
  _showError$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get messageData() {
    return this.__messageContentService.messageData;
  }

  onTouched!: Function;
  onChange!: Function;
  //#endregion

  constructor(private __messageContentService: MessageContentService) {}

  ngOnInit(): void {
    this.__messageContentService.createReplacements(this.messageBindings);
    this._showError$.next(this.hasError);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this._showError$.next(this.hasError);
  }

  //#region Methods
  submitNewMessage(): void {
    this?.onTouched();
    this?.onChange(
      this.messageData.text
        ? {
            message: this.messageData.text,
            previewMessage: this.messageData.replaceText,
          }
        : undefined
    );
  }

  addMessageBinding(message: MessageBinding): void {
    this.__messageContentService.addMessageAttribute(message);
    this.submitNewMessage();
  }

  getMsgCount(): number {
    return GsmCharsetUtils.getCharCount(this.messageData.replaceText)?.msgCount;
  }

  inputChange(): void {
    this.__messageContentService.inputChange();
    this.submitNewMessage();
  }

  caretChange(): void {
    if (this.textarea.nativeElement) {
      this.__messageContentService.updateCaret(
        this.textarea.nativeElement.selectionStart
      );
    }
  }

  textClicked(): void {
    this?.onTouched();
    this.caretChange();
  }

  setTextDirection(dir: 'ltr' | 'rtl'): void {
    this._langDir$.next(dir);
  }

  suggestionPick(suggestion: string): void {
    this.messageData.text = suggestion;
    this.inputChange();
  }

  /* Control value accessor functions */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {
    this.__messageContentService.init(obj?.message, obj?.previewMessage);
  }
  //#endregion
}
