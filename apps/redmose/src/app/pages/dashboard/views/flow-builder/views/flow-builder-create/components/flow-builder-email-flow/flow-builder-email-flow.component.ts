import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { DropdownModule } from 'primeng/dropdown';
import { FlowBuilderEmailTemplatesListComponent } from '../flow-builder-email-templates-list/flow-builder-email-templates-list.component';
import { FlowBuilderEmailTemplatePreviewComponent } from '../flow-builder-email-template-preview/flow-builder-email-template-preview.component';
import { EMAIL_CONTENT_DEMO } from './email-content-demo';
import { FlowBuilderEmailImportTemplateComponent } from '../flow-builder-email-import-template/flow-builder-email-import-template.component';
import { FlowBuilderEmailEditorComponent } from '../flow-builder-email-editor/flow-builder-email-editor.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { FlowBuilderApi, FlowBuilderApiModule } from '@redmose/shared/api';
import {
  CreateWorkflowService,
  EmailWorkflow,
  EmailWorkflowService,
} from '../../shared/services';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  ReactiveFormsModule,
} from '@angular/forms';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import {
  EMAIL_TEMPLATE_TYPES,
  StepConfig,
  STEPS_CONFIG,
} from '../../shared/constants/step-config.constant';
import { DomSanitizer } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';
import { EmailBuilderModule } from '../../../../../../../../../../../../libs/feature/src/lib/email-builder/email-builder.module';
import { EditorModule } from 'primeng/editor';
import { ControlErrorsModule } from '@convertedin/ui';
import { Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
// Define constants for the step numbers

const STEP_IMPORT = 4;
const STEP_EDIT_IMPORTED = 5;
const STEP_EDIT_TEMPLATE = 2;
const STEP_FREE_TEXT = 6;

@Component({
  selector: 'convertedin-flow-builder-email-flow',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    SidebarModule,
    DropdownModule,
    FlowBuilderEmailTemplatesListComponent,
    FlowBuilderEmailTemplatePreviewComponent,
    FlowBuilderEmailImportTemplateComponent,
    FlowBuilderEmailEditorComponent,
    FlowBuilderApiModule,
    ReactiveFormsModule,
    RxReactiveFormsModule,
    EmailBuilderModule,
    EditorModule,
    ControlErrorsModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: EmailWorkflow,
      useClass: EmailWorkflowService,
    },
  ],
  templateUrl: './flow-builder-email-flow.component.html',
  styleUrls: ['./flow-builder-email-flow.component.scss'],
})
export class FlowBuilderEmailFlowComponent implements OnInit {
  sidebarVisible = false;
  emailContent: any;
  activeStep = 7;
  stepsConfigs: StepConfig = STEPS_CONFIG;
  form: FormGroup;
  selectedTemplate: any;
  @ViewChild('importHtmlComponent') importHtmlComponent;
  @ViewChild('emailEditor') emailEditor;
  finalHtml: any;
  senderConfig = {};
  index: number;
  freeTextForm: FormGroup;
  formSubmitted: boolean;
  loading: boolean;
  editMode: boolean;

  constructor(
    private __translate: TranslateService,
    private emailWorkflow: EmailWorkflow,
    private _sanitizer: DomSanitizer,
    private __formDir: FormGroupDirective,
    private __flowBuilderApiService: FlowBuilderApi,
    private __workflowService: CreateWorkflowService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.freeTextForm = this.formBuilder.group({
      freeTextValue: [''],
    });
    this.freeTextForm.valueChanges.subscribe((value) =>
      this.cdr.detectChanges()
    );
    this.__workflowService.emailActivePage.subscribe((data) => {
      if (data) {
        this.activeStep = data.activePage;
        this.sidebarVisible = true;
      }
    });
    this.__workflowService.emailEditeActivePage.subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.updateTemplate();
          this.cdr.detectChanges();
        }, 50);
      }
    });
  }

  get controls(): any {
    return this.form.controls;
  }

  // Selects a template and navigates to the appropriate step in the flow builder.
  selectTemplate(data: any) {
    // this.selectedTemplate = data;
    this.controls.factoryControl.patchValue({
      type: EMAIL_TEMPLATE_TYPES.TEMPLATE,
      name: data.name,
      image: data.image,
      id: data.id,
    });
    this.cdr.detectChanges();
    this.updateTemplateById(data.id);

    if (data.previewEmail) {
      this.activeStep = 1;
    } else if (data.selectEmail) {
      this.activeStep = 2;
    }
    this.toggleLoading();
  }

  /**
   * Fetches a template by its ID from the FlowBuilderApi service,
   * updates the content property with the fetched template,
   * and triggers change detection.
   */
  fetchTemplateById(id: number): Observable<any> {
    return this.__flowBuilderApiService.fetchTemplateById(id);
  }

  updateTemplateById(id: number) {
    this.fetchTemplateById(id).subscribe((response: any) => {
      const template = this.__workflowService.splitHtml(response.html);
      const updatedTemplate = this.addLogoImgToEmailTemplate(template.bodyContent);

      this.emailContent = updatedTemplate;
      this.controls.factoryControl.patchValue({
        ...this.form.value.factoryControl,
        body: updatedTemplate,
        beforeBody: template.beforeBody,
        afterBody: template.afterBody,
      });
      this.cdr.detectChanges();
    });
  }

  addLogoImgToEmailTemplate(template: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(template, 'text/html');

    const logImgs = doc.querySelectorAll('#logo-header');
    logImgs.forEach((ele: HTMLImageElement) => {
      ele.src = this.form.value.emailLogo;
    });

    return `<body>${doc.body.innerHTML}</body>`;
  }
  /**
   * The `updateTemplate()` function is responsible for updating the active step based on the type of the email template.
   * It uses a switch statement to check the type of the email template and sets the `activeStep` accordingly.
   *
   * If the type of the email template is `EMAIL_TEMPLATE_TYPES.IMPORTED`, it sets `activeStep` to 5.
   * If the type of the email template is `EMAIL_TEMPLATE_TYPES.TEMPLATE`, it sets `activeStep` to 2.
   * If the type of the email template is `EMAIL_TEMPLATE_TYPES.FREE_TEXT`, it sets `activeStep` to 6.
   *
   * After setting the `activeStep`, it makes the sidebar visible by setting `sidebarVisible` to true.
   */
  updateTemplate() {
    this.editMode = true;
    // Switch on the type of the email template
    switch (this.form.value.html.type) {
      // If the type is IMPORTED, set activeStep to 5
      case EMAIL_TEMPLATE_TYPES.IMPORTED:
        this.activeStep = 5;
        this.toggleLoading();
        break;
      // If the type is TEMPLATE, set activeStep to 2
      case EMAIL_TEMPLATE_TYPES.TEMPLATE:
        this.activeStep = 2;
        this.toggleLoading();
        break;
      // If the type is FREE_TEXT, set activeStep to 6
      case EMAIL_TEMPLATE_TYPES.FREE_TEXT:
        this.activeStep = 6;
        this.toggleLoading(0);
        break;
    }
    this.controls.factoryControl.patchValue({
      id: this.form.value.html.id,
      body: this.form.value.html.body,
      name: this.form.value.html.name,
      image: this.form.value.html.image,
      type: this.form.value.html.type,
    });

    // Make the sidebar visible
    this.sidebarVisible = true;
  }

  private updateFormForStepImport() {
    this.controls.factoryControl.patchValue({
      body: this.importHtmlComponent.emailContent,
      type: EMAIL_TEMPLATE_TYPES.IMPORTED,
      name: this.__translate.instant('automation.imported-email'),
      image: '/app-assets/images/email-placeholder.png',
    });
  }

  // navigation logic
  private updateFormForStepEditImported() {
    this.emailContent = this.emailEditor.htmlContent;
    this.form.patchValue({
      html: {
        body: this.emailContent,
        type: EMAIL_TEMPLATE_TYPES.IMPORTED,
        name: this.__translate.instant('automation.imported-email'),
        image: '/app-assets/images/email-placeholder.png',
      },
    });
  }

  private updateFormForStepEditTemplate() {
    this.form.patchValue({
      html: {
        ...this.form.value.factoryControl,
        body: this.emailEditor.htmlContent,
        type: EMAIL_TEMPLATE_TYPES.TEMPLATE,
      },
    });
    this.controls.factoryControl.reset();
  }

  private updateFormForStepFreeText() {
    this.form.patchValue({
      html: {
        body: this.freeTextForm.value.freeTextValue,
        name: this.__translate.instant('automation.free-text-template'),
        image: '/app-assets/images/email-placeholder.png',
        type: EMAIL_TEMPLATE_TYPES.FREE_TEXT,
      },
    });
  }

  toggleLoading(time = 1000) {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    }, time);
  }

  next() {
    // If there is a next step
    if (this.stepsConfigs[this.activeStep].next !== -1) {
      // If the current step is the import step
      if (this.activeStep === STEP_IMPORT) {
        this.updateFormForStepImport();
      }
      // Move to the next step
      this.activeStep = this.stepsConfigs[this.activeStep].next;
    }
    // If there is no next step
    else if (this.stepsConfigs[this.activeStep].next === -1) {
      // If the current step is the edit imported email step
      if (this.activeStep === STEP_EDIT_IMPORTED) {
        this.updateFormForStepEditImported();
      }
      // If the current step is the edit template step
      else if (this.activeStep === STEP_EDIT_TEMPLATE) {
        this.updateFormForStepEditTemplate();
      }
      // If the current step is the free text step
      else if (this.activeStep === STEP_FREE_TEXT) {
        this.updateFormForStepFreeText();
      }
      // Reset to the first step and hide the sidebar
      this.activeStep = 0;
      this.sidebarVisible = false;
      this.form.patchValue({
        activeTemplates: true,
      });
    }
    // Trigger change detection to update the view
    this.cdr.detectChanges();
  }

  // Navigates to the previous step in the flow builder.
  prev() {
    if (this.editMode) {
      this.sidebarVisible = false;
      this.cdr.detectChanges();
      return;
    }
    if (this.stepsConfigs[this.activeStep].prev !== -1) {
      this.activeStep = this.stepsConfigs[this.activeStep].prev;
    } else if (this.stepsConfigs[this.activeStep].prev === -1) {
      this.activeStep = 0;
      this.sidebarVisible = false;
    }
    this.cdr.detectChanges();
  }

  // Initializes the form for the email workflow.
  initForm() {
    this.form = this.__formDir.control;
  }

  activeActionSubscription() {
    this.__workflowService.activeAction.subscribe((activeAction) => {
      if (activeAction) {
        this.index = activeAction.index;
        if (!this.senderConfig[activeAction.index]) {
          this.getEmailConfigurations();
        } else {
          this.form.patchValue(this.senderConfig[activeAction.index]);
        }
      }
    });
  }

  // Updates the form with the email configurations received from the server.
  private updateFormWithEmailConfigurations(res) {
    let configs = {
      senderEmail: res.senderEmail,
      senderName: res.senderName,
      emailLogo: res.emailLogo,
    };
    this.senderConfig[this.index] = configs;
    this.form.patchValue(configs);
  }

  // Fetches the email configurations from the server.
  private getEmailConfigurations() {
    this.__flowBuilderApiService.getEmailConfigurations().subscribe((res) => {
      this.updateFormWithEmailConfigurations(res);
    });
  }

  updateFlowWithEditData() {
    switch (this.form.value.html.type) {
      case EMAIL_TEMPLATE_TYPES.FREE_TEXT:
        this.updateFreeTextEmailTemplate();
        break;
      case EMAIL_TEMPLATE_TYPES.TEMPLATE:
        this.updateTemplateEmailTemplate();
        break;
      case EMAIL_TEMPLATE_TYPES.IMPORTED:
        this.updateImportedEmailTemplate();
        break;
    }
  }

  updateFreeTextEmailTemplate() {
    this.freeTextForm.patchValue({
      freeTextValue: this.form.value.html.body,
    });
    this.controls.html.patchValue({
      ...this.form.value.html,
      name: this.__translate.instant('automation.free-text-template'),
      image: '/app-assets/images/email-placeholder.png',
    });
  }

  updateTemplateEmailTemplate() {
    this.fetchTemplateById(this.form.value.html.id).subscribe(
      (response: any) => {
        this.controls.html.patchValue({
          ...this.form.value.html,
          image: response.image,
          name: response.name,
        });
        this.cdr.detectChanges();
      }
    );
  }

  updateImportedEmailTemplate() {
    this.controls.html.patchValue({
      ...this.form.value.html,
      name: this.__translate.instant('automation.imported-email'),
      image: '/app-assets/images/email-placeholder.png',
    });
  }

  ngOnInit() {
    this.initForm();
    this.activeActionSubscription();
    if (this.form.value.html.type) {
      // this.updateFlowWithEditData();
      this.freeTextForm.patchValue({
        freeTextValue: this.form.value.html.body,
      });
    }
    // this.getEmailConfigurations();
  }

  cancel() {
    this.sidebarVisible = false;
    this.selectedTemplate = null;
    this.controls.factoryControl.reset();
  }
}
