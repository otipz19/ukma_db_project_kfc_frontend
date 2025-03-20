import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordsEqualValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    if (!password || !passwordConfirm || password.value !== passwordConfirm.value) {
      return {passwordsAreNotEqual: {value: 'Паролі мають співпадати'}};
    }

    return null;
  };
}
