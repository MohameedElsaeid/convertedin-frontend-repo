import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import grapesjs from 'grapesjs';
import ckeditorPlugin from 'grapesjs-plugin-ckeditor';
import { Observable } from 'rxjs';
import { customPlugin } from './vendors/grapesjs-preset-newsletter/index';

// declare let grapesjs: any;
declare let CKEDITOR: any;

@Component({
  selector: 'convertedin-email-builder',
  templateUrl: './email-builder.component.html',
  styleUrls: ['./email-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmailBuilderComponent implements OnInit {
  @Input() advanced!: boolean;
  @Input() emailHtml: any;
  @Input() uploadURL = '/ajax/upload-service/multi';
  @Input() uploadImageFn!: (files: any) => Observable<Array<string>>;
  private _emailContent: any;
  content!: SafeHtml;

  @Input()
  set html(value: any) {
    this._emailContent = value;
    this.updateContent();
  }

  constructor(
    private renderer: Renderer2,
    private _sanitizer: DomSanitizer,
    private loaderService: NgxUiLoaderService,
    private cdr: ChangeDetectorRef
  ) {
    localStorage.removeItem('gjsProject');
    localStorage.removeItem('gjsProjectNl');
    this.loaderService.startLoader('editor-loader');
  }

  get html(): any {
    return this._emailContent;
  }

  private updateContent() {
    this.content = this._sanitizer.bypassSecurityTrustHtml(
      DOMPurify.sanitize(this.html)
    );
    this.editor?.addComponents(this.html);
  }

  private styles = [
    // 'https://grapesjs.com/stylesheets/grapes.min.css?v0.21.8',
    // 'https://grapesjs.com/stylesheets/material.css',
    // 'https://grapesjs.com/stylesheets/tooltip.css',
    // 'https://grapesjs.com/stylesheets/demos.css?v2',
    'grapesjs.css',
  ];
  private scripts = [
    // 'https://grapesjs.com/js/grapes.min.js?v0.21.8',
    // 'https://unpkg.com/grapesjs-plugin-ckeditor',
    // 'https://grapesjs.com/js/grapesjs-plugin-ckeditor/index.js',
    'https://cdn.ckeditor.com/4.21.0/standard-all/ckeditor.js',
  ];

  editor: any;

  injectStyles() {
    this.styles.forEach((style) => {
      (window as any)['define'] = undefined;
      const link = this.renderer.createElement('link');
      this.renderer.setAttribute(link, 'rel', 'stylesheet');
      this.renderer.setAttribute(link, 'href', style);
      this.renderer.appendChild(document.head, link);
    });
  }

  injectScripts() {
    // let defined = JSON.parse(JSON.stringify(window['define']))
    this.scripts.forEach((script) => {
      (window as any)['define'] = undefined;
      const link = this.renderer.createElement('script');
      link.src = script;
      link.type = 'text/javascript';
      link.async = true;
      this.renderer.appendChild(document.body, link);
    });
    // window['define'] = defined;
  }

  ngOnInit() {
    if (!this.advanced) {
      this.scripts.push('/app-assets/vendors/index-custom.min.js');
    }

    this.injectStyles();
    this.injectScripts();

    setTimeout(() => {
      this.initializeGrapesJs();
      this.loaderService.stopLoader('editor-loader');
    }, 1000);
  }

  async initializeGrapesJs() {
    const advancedPlugin = this.advanced
      ? [customPlugin]
      : ['grapesjs-preset-newsletter'];
    // Set up GrapesJS editor with the Newsletter plugin
    this.editor = grapesjs.init({
      colorPicker: { appendTo: 'parent', offset: { top: 26, left: -166 } },
      selectorManager: { componentFirst: true },
      // clearOnRender: true,
      height: '100%',
      storageManager: {
        options: {
          local: { key: 'gjsProjectNl' },
        },
      },
      assetManager: {
        assets: [],
        upload: this.uploadURL,
        uploadName: 'file',
        beforeUpload: (files): false | void => {
          if (!this.uploadImageFn) return;
          this.uploadImageFn(files).subscribe((url) => {
            url.forEach((url) => {
              this.editor.AssetManager.add(url);
            });
          });
          return false;
        },
        // uploadText: 'Uploading is not available in this demo'
      },
      container: '#gjs',
      fromElement: true,
      // richTextEditor:{custom:true},
      plugins: [
        ...advancedPlugin,
        (editor) => {
          // if (!this.advanced)
            ckeditorPlugin(editor, {
              options: {
                allowedContent: true, // Allow all content without restrictions
                extraAllowedContent: '*(*);*{*}', // Allow custom classes and inline styles
              },
            });
        },
      ],
    });

    // Let's add in this demo the possibility to test our newsletters
    var pnm = this.editor.Panels;
    var cmdm = this.editor.Commands;
    var md = this.editor.Modal;

    // Add info command
    var infoContainer = document.getElementById('info-panel');
    cmdm.add('open-info', {
      run: function (editor: any, sender: any) {
        var mdlClass = 'gjs-mdl-dialog-sm';
        sender.set('active', 0);
        var mdlDialog = document.querySelector('.gjs-mdl-dialog');
        mdlDialog!.className += ' ' + mdlClass;
        infoContainer!.style.display = 'block';
        md.open({
          title: 'About this demo',
          content: infoContainer,
        });
        md.getModel().once('change:open', function () {
          mdlDialog!.className = mdlDialog!.className.replace(mdlClass, '');
        });
      },
    });

    // Add info button
    const iconStyle = 'style="display: block; max-width: 22px"';
    pnm.addButton('options', [
      {
        id: 'view-info',
        label: `<svg ${iconStyle} viewBox="0 0 24 24">
            <path fill="currentColor" d="M15.07,11.25L14.17,12.17C13.45,12.89 13,13.5 13,15H11V14.5C11,13.39 11.45,12.39 12.17,11.67L13.41,10.41C13.78,10.05 14,9.55 14,9C14,7.89 13.1,7 12,7A2,2 0 0,0 10,9H8A4,4 0 0,1 12,5A4,4 0 0,1 16,9C16,9.88 15.64,10.67 15.07,11.25M13,19H11V17H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,6.47 17.5,2 12,2Z" />
        </svg>`,
        command: 'open-info',
        attributes: {
          title: 'About',
          'data-tooltip-pos': 'bottom',
        },
      },
    ]);
    // Beautify tooltips
    // [
    //   ['sw-visibility', 'Show Borders'],
    //   ['preview', 'Preview'],
    //   ['fullscreen', 'Fullscreen'],
    //   ['export-template', 'Export'],
    //   ['undo', 'Undo'],
    //   ['redo', 'Redo'],
    //   ['gjs-open-import-template', 'Import'],
    //   ['gjs-toggle-images', 'Toggle images'],
    //   ['canvas-clear', 'Clear canvas']
    // ]
    //   .forEach(function(item) {
    //   pnm.getButton('options', item[0]).set('attributes', { title: item[1], 'data-tooltip-pos': 'bottom' });
    // });
    // [
    //   ['open-sm', 'Style Manager'],
    //   ['open-layers', 'Layers'],
    //   ['open-blocks', 'Blocks']
    // ].forEach(function(item) {
    //   pnm.getButton('views', item[0]).set('attributes', { title: item[1], 'data-tooltip-pos': 'bottom', title2: item[1] });
    //   console.log('views', item[0], pnm.getButton('views', item[0]).get('attributes'))
    // });

    var titles = document.querySelectorAll('*[title]');
    for (var i = 0; i < titles.length; i++) {
      var el = titles[i];
      var title = el.getAttribute('title');
      title = title ? title.trim() : '';
      if (!title) break;
      el.setAttribute('data-tooltip', title);
      el.setAttribute('title', '');
    }

    // Update canvas-clear command
    cmdm.add('canvas-clear', () => {
      if (confirm('Are you sure to clean the canvas?')) {
        this.editor.runCommand('core:canvas-clear');
        setTimeout(function () {
          localStorage.clear();
        }, 0);
      }
    });
    // Do stuff on load
    this.editor.onReady(function () {
      // Show borders by default
      pnm.getButton('options', 'sw-visibility').set('active', 1);

      // Show logo with the version
      // var logoCont = document.querySelector('.gjs-logo-cont');
      // document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
      // var logoPanel = document.querySelector('.gjs-pn-commands');
      // logoPanel.appendChild(logoCont);

      // Wait for CKEDITOR load to enable edit
      setTimeout(() => {
        if (CKEDITOR) {
          CKEDITOR.dtd.$editable.a = 1;
          for (let element in CKEDITOR.dtd) {
            CKEDITOR.dtd.$editable[element] = 1;
          }
        }
      }, 200);
    });
  }

  get htmlContent(): string {
    let page = this.editor.Pages.getAll()[0].getMainComponent() as any;
    let content = `${this.editor.getHtml({ page })}`.replace('</body>', '');
    let pureContent = this.editor.runCommand('gjs-get-inlined-html');
    // return `${content} <style>${this.editor.getCss({ page })}</style> </body>`;
    return pureContent;
  }
}
