import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import {
  InputSwitchModule,
  InputSwitchOnChangeEvent,
} from 'primeng/inputswitch';
import { EmailTemplate } from '@super-admin/shared/api/email-template';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'convertedin-email-template-card',
  standalone: true,
  imports: [CommonModule, ButtonModule, InputSwitchModule, FormsModule],
  templateUrl: './email-template-card.component.html',
  styleUrls: ['./email-template-card.component.scss'],
  host: {
    class:
      'flex flex-col justify-between gap-2 p-4 rounded-lg border-gray-200 border shadow-lg',
  },
})
export class EmailTemplateCardComponent {
  @Input() template!: EmailTemplate;
  @Output() onDelete = new EventEmitter();
  @Output() onChangeStatus = new EventEmitter();
  deleteTemplate(e: Event) {
    e.stopPropagation();
    this.onDelete.emit(this.template)
  }
  changeStatus(e:InputSwitchOnChangeEvent) {
    e.originalEvent.stopPropagation();
    this.onChangeStatus.emit(this.template)
  }
}
