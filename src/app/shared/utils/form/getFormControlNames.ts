import {FormGroup} from "@angular/forms";

export function getFormControlNames<TForm extends FormGroup>(form: TForm): Record<keyof TForm['controls'], string> {
  let result: Record<string, string> = {};

  for(const controlName of Object.keys(form.controls)) {
    result[controlName] = controlName;
  }

  return result as Record<keyof TForm['controls'], string>;
}
