import {Component} from '@angular/core';
import {BaseSetContactsForm} from "../base-set-contact-form/base-set-contacts-form";
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {phoneNumberFormatValidator} from "../../../../../shared/form/validators/phone-number-format.validator";
import {
  CommonFormInputFieldComponent
} from "../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";

@Component({
  selector: 'app-set-phones-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './set-phones-form.component.html',
  styleUrl: './set-phones-form.component.scss'
})
export class SetPhonesFormComponent extends BaseSetContactsForm {
  constructor() {
    super();
  }

  protected override buildControl(): FormControl<string> {
    return this.fb.control('', [phoneNumberFormatValidator()]);
  }
}
