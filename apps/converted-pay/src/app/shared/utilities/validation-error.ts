import { FormGroup } from '@angular/forms';

export function handleBackendErrors(errors: any, formGroup: FormGroup) {
  for (const field in errors) {
    if (errors[field]) {
      const control = formGroup.get(field);
      if (control) {
        control.setErrors({ serverError: { message: errors[field][0] } });
      }
    }
  }
}
