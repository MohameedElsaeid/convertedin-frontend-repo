import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';

enum DevicesEnum {
  DESKTOP = 'desktop',
  MOBILE = 'mobile'
}

@Component({
  selector: 'convertedin-flow-builder-email-template-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flow-builder-email-template-preview.component.html',
  styleUrls: ['./flow-builder-email-template-preview.component.scss']
})
export class FlowBuilderEmailTemplatePreviewComponent {
  activeDevice: DevicesEnum = DevicesEnum.DESKTOP;
  deviceEnum = DevicesEnum;
  private _emailContent: any;
  @Input()
  set emailContent(value: any) {
    this._emailContent = value;
    this.updateContent();
  }

  @Input() id: number;

  content: any;

  constructor(private _sanitizer: DomSanitizer) {
  }

  toggleDevice(device: DevicesEnum) {
    this.activeDevice = device;
  }


  get emailContent(): any {
    return this._emailContent;
  }

  replaceFixedWidth(htmlString) {
    // Parse the HTML string into a DOM element
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(htmlString, 'text/html');

// Select all tables in the document
    const tables = htmlDoc.querySelectorAll('table');

// Loop through each table and set its width to 100%
    tables.forEach(table => {
      table.style.width = '100%';
    });

// Serialize the modified HTML back to a string
    const modifiedHtmlString = new XMLSerializer().serializeToString(htmlDoc);

// Now you can use `modifiedHtmlString` which contains the updated HTML content with all table widths set to 100%
    return modifiedHtmlString;
  }

  private updateContent() {

    this.content = this._sanitizer.bypassSecurityTrustHtml(DOMPurify.sanitize(this.replaceFixedWidth(this.emailContent)));
  }

}

