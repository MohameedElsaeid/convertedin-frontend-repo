import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { QueryApi } from '@convertedin/api';
import { TranslateModule } from '@ngx-translate/core';
import { MessageBinding } from '@redmose/shared/api';
import { SpinnerComponent } from '@redmose/shared/components/spinner/spinner.component';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TooltipModule } from 'primeng/tooltip';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'convertedin-message-generate-with-ai',
  templateUrl: './message-generate-with-ai.component.html',
  styleUrls: ['./message-generate-with-ai.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    OverlayPanelModule,
    SpinnerComponent,
    TooltipModule,
    TranslateModule,
  ],
})
export class MessageGenerateWithAiComponent {
  //#region Declerations
  @HostBinding('class') class =
    'flex justify-content-between py-2 align-items-center mb-4';
  @Input() disabled: boolean = false;
  @Input() message: string = '';
  @Input() targetTemplate: any;
  @Input({ required: true }) messageAttributes: MessageBinding[];
  @Output() suggestionSelect: EventEmitter<string> = new EventEmitter();
  _isLoading: boolean = false;
  _aiRecommendations$!: Observable<{ data: { text: string }[] }>;
  //#endregion

  constructor(private __queryApi: QueryApi) {}

  //#region Methods
  generateRecommendations(): void {
    this._isLoading = true;
    this._aiRecommendations$ = this.getAiRecommendations(
      this.message,
      this.getAttributeString()
    ).pipe(
      finalize(() => {
        this._isLoading = false;
      })
    );
  }

  getAiRecommendations(
    content: string,
    attributes: string
  ): Observable<{ data: { text: string }[] }> {
    return this.__queryApi.post('/api/generate/sms-content', {
      content,
      attributes,
    });
  }

  getAttributeString(): string {
    return this.messageAttributes.map((item) => item.parameter).join(',');
  }
  //#endregion
}
