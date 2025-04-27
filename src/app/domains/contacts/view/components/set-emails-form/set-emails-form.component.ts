import {Component} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {emailFormatValidator} from "../../../../../shared/form/validators/email-format.validator";
import {
  CommonFormInputFieldComponent
} from "../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {BaseSetContactsForm} from "../base-set-contact-form/base-set-contacts-form";

@Component({
  selector: 'app-set-emails-form',
  imports: [
    ReactiveFormsModule,
    CommonFormInputFieldComponent
  ],
  templateUrl: './set-emails-form.component.html',
  styleUrl: './set-emails-form.component.scss'
})
export class SetEmailsFormComponent extends BaseSetContactsForm {
  constructor() {
    super();
  }

  protected buildControl() {
    return this.fb.control('', [emailFormatValidator()]);
  }
}
