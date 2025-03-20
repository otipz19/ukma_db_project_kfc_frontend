import {AbstractControl, ValidatorFn, Validators} from "@angular/forms";

export function emailValidator(): ValidatorFn {
  return Validators.compose([
    Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}"),
    Validators.maxLength(320)
  ])!;
}
