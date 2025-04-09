import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'convertedin-ai-data-section',
  templateUrl: './ai-data-section.component.html',
  styleUrls: ['./ai-data-section.component.scss'],
  standalone: true,
  imports: [CommonModule, TranslateModule],
})
export class AiDataSectionComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) items!: Array<any>;
  @Input({ required: true }) nameDataKey!: string;
  @Input() canDelete: boolean = true;
  @Output() suggestionDelete: EventEmitter<number> = new EventEmitter();
  @Output() openPopup: EventEmitter<string> = new EventEmitter();
}
