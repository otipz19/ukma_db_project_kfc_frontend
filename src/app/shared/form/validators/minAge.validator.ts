import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {CUSTOM_VALIDATION_ERROR_KEY} from "../utils/get-validation-error-message";

export function minAgeValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if(!control.value) {
      return null;
    }

    const today = new Date();
    const birth = new Date(control.value);
    let age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();

    // Adjust age if birthday hasn't occurred yet this year
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if(age < min) {
      return {
        [CUSTOM_VALIDATION_ERROR_KEY.minAge]: min
      }
    }

    return null;
  };
}
