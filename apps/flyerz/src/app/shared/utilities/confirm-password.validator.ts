import { AbstractControl } from '@angular/forms';

export function confirmPasswordValidator(
  control: AbstractControl,
  passwordKey: string,
  confirmPasswordKey: string,
  errorMsg: string
): { [key: string]: { message: string } } | null {
  const password = control.get(passwordKey);
  const confirmPassword = control.get(confirmPasswordKey);

  if (password && confirmPassword) {
    if (confirmPassword.value !== password.value && confirmPassword.dirty) {
      return {
        confirmPasswordMismatch: {
          message: errorMsg,
        },
      };
    }
  }

  return null;
}
