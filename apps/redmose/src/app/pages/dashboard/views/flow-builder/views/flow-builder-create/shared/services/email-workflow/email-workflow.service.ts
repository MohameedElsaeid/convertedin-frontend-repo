import { Injectable } from '@angular/core';
import { EmailWorkflow } from './email-workflow';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RxwebValidators } from '@rxweb/reactive-form-validators';


@Injectable()
export class EmailWorkflowService implements EmailWorkflow {

  constructor(private __formBuilder: FormBuilder) {

  }

  createEmailConfigForm(): FormGroup {
    return this.__formBuilder.group({
      stepName: ['', RxwebValidators.required({
        message: 'Step Name is required'
      })],
      senderName: ['', RxwebValidators.required({ message: 'Sender Name is required' })],
      senderEmail: ['', RxwebValidators.required({ message: 'Sender Email is required' })],
      subject: ['', RxwebValidators.required({ message: 'Subject is required' })]
    });
  }
}
