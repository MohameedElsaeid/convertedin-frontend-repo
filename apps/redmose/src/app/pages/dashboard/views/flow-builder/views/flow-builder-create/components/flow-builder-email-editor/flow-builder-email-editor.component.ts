import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EmailBuilderModule
} from '../../../../../../../../../../../../libs/feature/src/lib/email-builder/email-builder.module';

@Component({
  selector: 'convertedin-flow-builder-email-editor',
  standalone: true,
  imports: [CommonModule, EmailBuilderModule],
  templateUrl: './flow-builder-email-editor.component.html',
  styleUrls: ['./flow-builder-email-editor.component.scss'],
})
export class FlowBuilderEmailEditorComponent {
  @Input() html: any;
}
