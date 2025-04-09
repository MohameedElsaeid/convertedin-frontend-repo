import { Component, EventEmitter, HostBinding, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { provideCreateAdApi } from '@flyerz/shared/api';

@Component({
  selector: 'convertedin-suggestion-popup-container',
  standalone: true,
  imports: [
    ButtonModule,
    TranslateModule,
    ReactiveFormsModule,
    AutoCompleteModule,
  ],
  templateUrl: './suggestion-popup-container.component.html',
  styleUrls: ['./suggestion-popup-container.component.scss'],
})
export class SuggestionPopupContainerComponent {
  //#region Declerations
  @HostBinding('class') class = 'flex flex-column gap-4';
  @Output() searchChange: EventEmitter<string> = new EventEmitter();
  @Output() save: EventEmitter<void> = new EventEmitter();

  form: FormGroup = this.__formBuilder.group({
    search: [null],
  });
  get dir() {
    return document.documentElement.dir;
  }
  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __dialog: DynamicDialogRef
  ) {}

  //#region Methods
  submitSearch(): void {
    this.searchChange.emit(this.form.value.search);
  }

  closeDialog(): void {
    this.__dialog.close();
  }
  //#endregion
}
