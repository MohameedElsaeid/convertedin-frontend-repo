import { FormGroup } from "@angular/forms";


export abstract class EmailWorkflow {
// create abstract email configuration form
  abstract createEmailConfigForm(): FormGroup;
}
