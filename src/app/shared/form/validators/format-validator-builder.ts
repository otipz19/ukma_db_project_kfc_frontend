import {CustomValidationErrorKey} from "../utils/get-validation-error-message";
import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function buildFormatValidator(regex: RegExp, errorKey: CustomValidationErrorKey, tip?: string): () => ValidatorFn {
  return () => {
    return (control: AbstractControl): ValidationErrors | null => {
      if(!control.value) {
        return null;
      }

      if(!regex.test(control.value)) {
        return {
          [errorKey]: {
            value: true,
            tip
          }
        };
      }

      return null;
    };
  };
}
