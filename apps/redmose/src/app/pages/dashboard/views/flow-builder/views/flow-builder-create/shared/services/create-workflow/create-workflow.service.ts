import { Injectable } from '@angular/core';
import { CreateWorkflow } from './create-workflow';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RxwebValidators, email } from '@rxweb/reactive-form-validators';
import {
  SMSAction,
  WorkFlowAction,
  Workflow,
  WorkflowStep,
  NotificationAction,
  FlowBuilderApi,
} from '@redmose/shared/api';
import { ActiveAction } from '../../../models/interfaces';
import { EMAIL_TEMPLATE_TYPES } from '../../constants/step-config.constant';
import { finalize, switchMap } from 'rxjs/operators';
import { EMAIL_CONTENT } from '../../constants/email-content.constant';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CreateWorkflowService extends CreateWorkflow {
  //#region Declerations
  private __selectedActionsForm!: FormGroup;

  private __activeAction: BehaviorSubject<ActiveAction | undefined> =
    new BehaviorSubject(undefined);

  private __emailActivePage: BehaviorSubject<{
    activePage: number;
  }> = new BehaviorSubject(undefined);
  private __emailEditeActivePage: BehaviorSubject<{
    index: number;
  }> = new BehaviorSubject(undefined);

  get selectedActionsForm(): FormGroup {
    return this.__selectedActionsForm;
  }

  get selectedActionsFormArray(): FormArray {
    return this.__selectedActionsForm.get('steps') as FormArray;
  }

  get activeAction(): Observable<ActiveAction | undefined> {
    return this.__activeAction.asObservable();
  }

  public setEmailActivePage(activePage: { activePage: number }): void {
    this.__emailActivePage.next(activePage);
  }

  get emailActivePage(): Observable<
    | {
        activePage: number;
      }
    | undefined
  > {
    return this.__emailActivePage.asObservable();
  }

  public setEmailEditeActivePage(index: number): void {
    this.__emailEditeActivePage.next({ index });
  }

  get emailEditeActivePage(): Observable<
    | {
        index: number;
      }
    | undefined
  > {
    return this.__emailEditeActivePage.asObservable();
  }

  get activeActionValue() {
    return this.__activeAction.value;
  }

  //#endregion

  constructor(
    private __formBuilder: FormBuilder,
    private __flowBuilderApiService: FlowBuilderApi,
    private __translate: TranslateService
  ) {
    super();
  }

  //#region public methods
  // Discards current workflow data
  public override discardWorkflow(): void {
    this.initWorkflowForm();
  }

  public override addNewAction(index: number, action: WorkFlowAction): void {
    switch (action) {
      case WorkFlowAction.DELAY:
        this.addDelayForm(index);
        break;

      case WorkFlowAction.SMS:
        this.addSMSForm(index);
        break;

      case WorkFlowAction.NOTIFICATION:
        this.addNotificationsForm(index);
        break;

      case WorkFlowAction.EMAIL:
        this.addEmailForm(index);
    }
  }

  //Deletes form group from form array
  public override deleteAction(index: number): void {
    this.selectedActionsFormArray.removeAt(index);
    if (this.__activeAction.value?.index === index) {
      this.__activeAction.next(undefined);
    }
  }

  //Initialize form array
  public override initWorkflowForm(flow?: Workflow): void {
    this.__selectedActionsForm = this.__formBuilder.group({
      steps: this.__formBuilder.array(
        flow ? this.fillFormArray(flow) : [this.createTriggerForm()]
      )
    });

    this.__activeAction.next({
      index: 0,
      type: WorkFlowAction.TRIGGER
    });
  }

  //Creates a copy of input form group
  public override copyFormGroup(
    type: WorkFlowAction,
    source: FormGroup<any>
  ): FormGroup<any> {
    const newForm: FormGroup = this.createWorkflowForm(type);

    if (source.value?.send_after) {
      this.addPeriodToForm(newForm);
    }

    newForm.patchValue(source.value);

    return newForm;
  }

  //Updates current active action
  public override setActiveAction(newAction: {
    type: WorkFlowAction;
    index: number;
  }): void {
    this.__activeAction.next(newAction);
  }


  //Updates exisiting form group in form group array
  public override updateExistingForm(newForm: FormGroup<any>): void {
    const selectedForm = this.selectedActionsFormArray.controls[
      this.__activeAction.value.index
      ] as FormGroup;

    if (newForm.value?.type === WorkFlowAction.TRIGGER) {
      if (newForm.value?.send_after && !selectedForm.contains('send_after')) {
        this.addPeriodToForm(selectedForm);
      } else if (
        !newForm.value?.send_after &&
        selectedForm.contains('send_after')
      ) {
        this.removePeriodFromForm(selectedForm);
      }
    }

    selectedForm.patchValue({ ...newForm.value });
  }

  //Adds period form setion to input form group
  public override addPeriodToForm(
    destination: FormGroup,
    valueName = 'send_after',
    typeName = 'send_after_type'
  ): void {
    destination.addControl(valueName, this.createPeriodValueControl());
    destination.addControl(typeName, this.createPeriodTypeControl());
  }

  //Removes period form section from input form group
  public override removePeriodFromForm(
    destination: FormGroup<any>,
    valueName = 'send_after',
    typeName = 'send_after_type'
  ): void {
    destination.removeControl(valueName);
    destination.removeControl(typeName);
  }

  //#endregion

  //#region Fill form array methods
  protected override fillFormArray(workflow: Workflow): Array<FormGroup> {
    const mappedSteps = workflow.steps.reduce(
      (workflowSteps: Array<FormGroup>, step: WorkflowStep) => {
        const form = this.createWorkflowForm(step.type);
        form.patchValue({ ...step });
        const steps = [...workflowSteps];
        if (step?.send_after) {
          steps.push(this.fillDelayForm(step));
        }
        if (
          step.type === WorkFlowAction.SMS ||
          step.type === WorkFlowAction.NOTIFICATION
        ) {
          this.fillSMSBody(step, form);
        }
        if ('meta' in step) {
          form.patchValue({ ...step.meta });
        }
        if (step.type === WorkFlowAction.EMAIL) {
          this.fillEmailBody(step, form);
        }
        steps.push(form);

        return steps;
      },
      []
    );

    return [this.fillTriggerForm(workflow), ...mappedSteps];
  }

  protected override fillDelayForm(step: SMSAction): FormGroup<any> {
    const delay = this.createDelayForm();
    delay.patchValue({
      send_after: step.send_after,
      send_after_type: step.send_after_type
    });

    return delay;
  }

  protected override fillSMSBody(step: SMSAction, form: FormGroup<any>): void {
    form.patchValue({
      body: {
        message: step.body,
        previewMessage: step.preview_body,
      },
    });
  }

  protected override fillEmailBody(step: any, form: FormGroup<any>): void {
    const EMAIL_TYPE = step.meta.email_type;

    const template =
      EMAIL_TYPE === EMAIL_TEMPLATE_TYPES.FREE_TEXT
        ? {
            beforeBody: '',
            bodyContent: step.body,
            afterBody: '',
          }
        : this.splitHtml(step.body);
    let emailInfo = {
      senderName: null,
      senderEmail: null,
      emailLogo:null,
      stepName: step.name,
      subject: step.meta.subject,
      html: {
        id: step.meta.template_id ? step.meta.template_id : null,
        type: step.meta.email_type,
        body: template.bodyContent,
        beforeBody: template.beforeBody,
        afterBody: template.afterBody,
        name: null,
        image: null,
      },
    };
    const emailTypeMap = {
      [EMAIL_TEMPLATE_TYPES.TEMPLATE]: { name: null, image: null },
      [EMAIL_TEMPLATE_TYPES.IMPORTED]: {
        name: 'Imported Template',
        image: '/app-assets/images/email-placeholder.png',
      },
      [EMAIL_TEMPLATE_TYPES.FREE_TEXT]: {
        name: 'Free Text Email Template',
        image: '/app-assets/images/email-placeholder.png',
      },
    };

    this.__flowBuilderApiService
      .getEmailConfigurations()
      .pipe(
        switchMap((data) => {
          emailInfo.senderEmail = data.senderEmail;
          emailInfo.senderName = data.senderName;
          emailInfo.emailLogo = data.emailLogo;
          if (EMAIL_TYPE === EMAIL_TEMPLATE_TYPES.TEMPLATE) {
            return this.__flowBuilderApiService.fetchTemplateById(
              step.meta.template_id
            );
          } else {
            return of(emailTypeMap[EMAIL_TYPE]);
          }
        }),
        finalize(() => form.patchValue(emailInfo))
      )
      .subscribe((template: any) => {
        if (template) {
          emailInfo.html.name = template.name;
          emailInfo.html.image = template.image;
        } else {
          emailInfo.html.name = emailTypeMap[EMAIL_TYPE].name;
          emailInfo.html.image = emailTypeMap[EMAIL_TYPE].image;
        }
      });
  }

  protected override fillTriggerForm(workflow: Workflow): FormGroup<any> {
    const triggerForm = this.createTriggerForm();
    if (workflow?.flow_entrance) {
      this.addPeriodToForm(triggerForm);
      triggerForm.patchValue({
        send_after: workflow?.flow_entrance,
        send_after_type: workflow.flow_entrance_type
      });
    }
    triggerForm.patchValue({ ...workflow });

    return triggerForm;
  }

  //#endregion

  //#region Create forms Methods
  //Creates a SMS form group
  protected override createSMSForm(): FormGroup {
    return this.__formBuilder.group({
      id: [],
      type: [WorkFlowAction.SMS],
      body: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant('required'),
          }),
        ],
      ],
      name: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant('Required'),
          }),
        ],
      ],
      customerSafeSend: [false],
      stopUnsubscribe: [false]
    });
  }

  protected override createWorkflowForm(type: WorkFlowAction): FormGroup<any> {
    let newForm!: FormGroup;

    switch (type) {
      case WorkFlowAction.DELAY:
        newForm = this.createDelayForm();
        break;

      case WorkFlowAction.TRIGGER:
        newForm = this.createTriggerForm();
        break;

      case WorkFlowAction.SMS:
        newForm = this.createSMSForm();
        break;

      case WorkFlowAction.NOTIFICATION:
        newForm = this.createNotificationsForm();
        break;

      case WorkFlowAction.EMAIL:
        newForm = this.createEmailForm();
        break;
    }

    return newForm;
  }

  //Creates a trigger form group
  protected override createTriggerForm(): FormGroup {
    return this.__formBuilder.group({
      id: [],
      type: [WorkFlowAction.TRIGGER],
      //todo remove before deploying [for development only]
      start_condition: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant('Required'),
          }),
        ],
      ],
      stop_condition: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant('Required'),
          }),
        ],
      ],
      name: [
        null,
        RxwebValidators.required({
          message: this.__translate.instant('Required'),
        }),
      ],
    });
  }

  protected createEmailForm(): FormGroup {
    return this.__formBuilder.group({
      type: [WorkFlowAction.EMAIL],
      id: [],
      stepName: [
        null,
        RxwebValidators.required({
          message: 'Step Name is required',
        }),
      ],
      senderName: [
        '',
        RxwebValidators.required({ message: 'Sender Name is required' }),
      ],
      senderEmail: [
        '',
        RxwebValidators.required({ message: 'Sender Email is required' }),
      ],
      emailLogo:[''],
      subject: [
        '',
        RxwebValidators.required({ message: 'Subject is required' }),
      ],
      html: [
        '',
        RxwebValidators.required({ message: 'Email Template is required' }),
      ],
      activeTemplates: [false],
      factoryControl: this.__formBuilder.group({
        id: [null],
        body: [null],
        name: [null],
        image: [null],
        type: [null],
        beforeBody: [null],
        afterBody: [null],
      }),
    });
  }

  //Creates a delay form group
  protected override createDelayForm(): FormGroup {
    return this.__formBuilder.group({
      type: [WorkFlowAction.DELAY],
      send_after: this.createPeriodValueControl(),
      send_after_type: this.createPeriodTypeControl()
    });
  }

  //Creates notification form group
  protected override createNotificationsForm(): FormGroup<any> {
    return this.__formBuilder.group({
      id: [],
      type: [WorkFlowAction.NOTIFICATION],
      name: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant('Required'),
          }),
        ],
      ],
      notification_title: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant('Required'),
          }),
        ],
      ],
      body: [
        null,
        [
          RxwebValidators.required({
            message: this.__translate.instant('Required'),
          }),
        ],
      ],
      notification_url: [null],
    });
  }

  protected override createPeriodValueControl(): FormControl<any> {
    return new FormControl(0, {
      validators: [
        RxwebValidators.minNumber({
          message: this.__translate.instant('Required'),
          value: 1,
        }),
      ],
    });
  }

  protected override createPeriodTypeControl(): FormControl<any> {
    return new FormControl(null, {
      validators: [
        RxwebValidators.required({
          message: this.__translate.instant('Required'),
        }),
      ],
    });
  }

  //#endregion

  //#region Add form to array Methods
  //Adds sns form to form array
  protected override addSMSForm(index: number): void {
    this.selectedActionsFormArray.insert(index + 1, this.createSMSForm());
  }

  protected addEmailForm(index: number): void {
    this.selectedActionsFormArray.insert(index + 1, this.createEmailForm());
  }

  //Adds delay form to form array
  protected override addDelayForm(index: number): void {
    this.selectedActionsFormArray.insert(index + 1, this.createDelayForm());
  }

  //Adds notification form to form array
  protected override addNotificationsForm(index: number): void {
    this.selectedActionsFormArray.insert(
      index + 1,
      this.createNotificationsForm()
    );
  }
  splitHtml(html_content: string) {
    const before_body_regex = /([\s\S]*?)(<body.*?>[\s\S]*?<\/body>)/; // Matches everything before <body>
    const after_body_regex = /(<\/body>)([\s\S]*)/; // Matches everything after </body>
    const body_content_regex = /<body[^>]*>([\s\S]*?)<\/body>/i; // Matches content inside <body>

    // Matches content inside <body>

    // Extract content using regular expressions
    const before_body_match = html_content.match(before_body_regex);
    const after_body_match = html_content.match(after_body_regex);
    const body_content_match = body_content_regex.exec(html_content);

    // Define default values for beforeBody and afterBody
    let beforeBody = EMAIL_CONTENT.beforeBody;
    let afterBody = EMAIL_CONTENT.afterBody;

    // Set beforeBody and afterBody to the default values if no match is found
    if (before_body_match) {
      beforeBody = before_body_match[1];
    }
    if (after_body_match) {
      afterBody = after_body_match[2];
    }

    // Return the extracted content along with default values
    return {
      beforeBody: beforeBody,
      bodyContent: body_content_match ? body_content_match[0] : '',
      afterBody: afterBody,
    };
  }

  //#endregion
}
