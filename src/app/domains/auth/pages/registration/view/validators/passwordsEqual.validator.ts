import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordsEqualValidator(passwordControlName: string = 'password', passwordConfirmControlName: string = 'password'): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get(passwordControlName);
    const passwordConfirm = control.get(passwordConfirmControlName);

    if (!password || !passwordConfirm || password.value !== passwordConfirm.value) {
      return {passwordsAreNotEqual: {value: true}};
    }

    return null;
  };
}
