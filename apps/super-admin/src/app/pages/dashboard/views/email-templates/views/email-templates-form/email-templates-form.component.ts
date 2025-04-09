import { Component, DestroyRef, ViewChild } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  InputSwitchModule,
  InputSwitchOnChangeEvent,
} from 'primeng/inputswitch';
import {
  EmailBuilderComponent,
  EmailBuilderModule,
} from '@convertedin/feature';
import { EmailTemplateApi } from '@super-admin/shared/api/email-template/base/email-template.base';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import {
  CreateEmailTemplate,
  EmailTemplateEndpoints,
} from '@super-admin/shared/api/email-template';
import { ButtonModule } from 'primeng/button';
import { finalize, map } from 'rxjs';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ControlErrorsModule } from '@convertedin/ui';
import { ActivatedRoute, Router } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LocalStorageConstants } from '@super-admin/shared/constants';
@Component({
  selector: 'convertedin-email-templates-form',
  templateUrl: './email-templates-form.component.html',
  styleUrls: ['./email-templates-form.component.scss'],
  standalone: true,
  imports: [
    InputTextModule,
    InputSwitchModule,
    EmailBuilderModule,
    ReactiveFormsModule,
    NgIf,
    ButtonModule,
    ControlErrorsModule,
    InputSwitchModule,
    InputNumberModule,
    ProgressSpinnerModule,
    NgFor,
  ],
  host: {
    class: 'p-6 flex flex-col grow relative',
  },
})
export class EmailTemplatesFormComponent {
  @ViewChild('emailEditor') emailEditor!: EmailBuilderComponent;
  imageUploaderURL = EmailTemplateEndpoints.UPLOAD_IMAGE;
  emailTemplateForm = new FormGroup({
    name: new FormControl(
      '',
      RxwebValidators.required({ message: 'Template Name is required' })
    ),
    description: new FormControl('test'),
    image_url: new FormControl(
      '',
      RxwebValidators.required({ message: 'Image is required' })
    ),
    html_body: new FormControl(),
    published: new FormControl(1),
    is_active: new FormControl(1),
    lang: new FormControl('en'),
    order: new FormControl(
      1,
      RxwebValidators.required({ message: 'Order is required' })
    ),
  });
  isLoading = false;
  isLoadingTemplate = false;
  templateId!: string;
  isLoadingImage = false;

  constructor(
    private emailTemplateApi: EmailTemplateApi,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private destroyRef: DestroyRef
  ) {}
  ngOnInit() {
    this.templateId = this.activeRoute.snapshot.params['id'];
    if (this.templateId) {
      this.getTemplateDetails();
    }
  }
  getTemplateDetails() {
    this.isLoadingTemplate = true;
    this.emailTemplateApi
      .getTemplateById(this.templateId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => {
          this.isLoadingTemplate = false;
        })
      )
      .subscribe((res) => {
        this.emailTemplateForm.patchValue({ ...(res.data.data as any) });
      });
  }
  onChangeStatus(e: InputSwitchOnChangeEvent) {
    this.emailTemplateForm.patchValue({ is_active: e.checked ? 1 : 0 });
  }

  onChangeFileInput(e: any) {
    this.onSelectFile(e.files);
  }
  onSelectFile(files: FileList) {
    const formData = new FormData();
    formData.append('image', files[0]);
    this.isLoadingImage = true;
    this.emailTemplateForm.patchValue({ image_url: '' });
    this.emailTemplateApi
      .uploadImage(formData)
      .pipe(
        finalize(() => {
          this.isLoadingImage = false;
        })
      )
      .subscribe((res) => {
        this.emailTemplateForm.patchValue({ image_url: res.url });
      });
  }
  onUploadImageInEmailBuilder =(files: FileList)=> {
    const formData = new FormData();
    formData.append('image', files[0]);
    return this.emailTemplateApi.uploadImage(formData).pipe(
      map((res) => [res.url])
    );
  }
  submit() {
    if (this.templateId) {
      this.editTemplate();
      return;
    }
    this.createTemplate();
  }
  createTemplate() {
    const value = this.emailTemplateForm.value;
    const html_body = this.emailEditor.htmlContent;
    this.isLoading = true;
    this.emailTemplateApi
      .createEmailTemplate({ ...value, html_body } as CreateEmailTemplate)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/dashboard/email-templates/list']);
      });
  }

  editTemplate() {
    const value = this.emailTemplateForm.value;
    const html_body = this.emailEditor.htmlContent;
    this.isLoading = true;
    this.emailTemplateApi
      .updateTemplate(this.templateId, {
        ...value,
        html_body,
      } as CreateEmailTemplate)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((res) => {
        this.router.navigate(['/dashboard/email-templates/list']);
      });
  }
}
