import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FlowBuilderEmailTemplatePreviewComponent
} from '../flow-builder-email-template-preview/flow-builder-email-template-preview.component';
import { CodeEditorComponent, CodeEditorModule, CodeModel } from '@ngstack/code-editor';
import { NgxUiLoaderModule, NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'convertedin-flow-builder-email-import-template',
  standalone: true,
  imports: [CommonModule, FlowBuilderEmailTemplatePreviewComponent,
    CodeEditorModule,
    NgxUiLoaderModule
  ],
  templateUrl: './flow-builder-email-import-template.component.html',
  styleUrls: ['./flow-builder-email-import-template.component.scss']
})
export class FlowBuilderEmailImportTemplateComponent implements OnInit {

  @ViewChild('emailEditor')
  codeEditorComponent: CodeEditorComponent;

  emailContent = '';
  theme = 'vs-dark';

  model: CodeModel = {
    language: 'html',
    uri: 'main.html',
    value: ''
  };

  options = {
    contextmenu: false,
    minimap: {
      enabled: false
    }
  };
  content: boolean;

  constructor(private cd: ChangeDetectorRef, private ngZone: NgZone, private loaderService: NgxUiLoaderService) {
  }


  ngOnInit() {
    this.loaderService.startLoader('import-loader');

    setTimeout(() => {
      this.codeEditorComponent.onResize();
      this.cd.markForCheck();
      this.cd.detectChanges();
      this.loaderService.stopLoader('import-loader');
    }, 3000);
  }

  onCodeChanged(value) {
    console.log(value);
    this.emailContent = value;
    this.cd.markForCheck();
    this.cd.detectChanges();

  }
}
