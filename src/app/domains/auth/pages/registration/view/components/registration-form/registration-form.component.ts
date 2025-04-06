import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {passwordsEqualValidator} from "../../validators/passwordsEqual.validator";
import {MatError} from "@angular/material/form-field";
import {emailValidator} from "../../../../../../../shared/form/validators/email.validator";
import {ErrorMessagePipe} from "../../../../../../../shared/form/pipes/error-message.pipe";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {
  CommonFormPasswordFieldComponent
} from "../../../../../../../shared/form/components/common-form-password-field/common-form-password-field.component";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";

@Component({
  selector: 'app-registration-form',
  imports: [
    MatButton,
    MatStepper,
    MatStep,
    MatStepLabel,
    MatStepperNext,
    MatStepperPrevious,
    ReactiveFormsModule,
    MatError,
    ErrorMessagePipe,
    CommonFormInputFieldComponent,
    CommonFormPasswordFieldComponent,
    CommonFormDatepickerFieldComponent,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly firstStepForm = this.fb.group({
    email: this.fb.control("", [Validators.required, emailValidator()]),
    password: this.fb.control("", [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
    passwordConfirm: this.fb.control("", [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
  }, {
    validators: [passwordsEqualValidator()]
  });

  protected readonly secondStepForm = this.fb.group({
    firstName: this.fb.control("", [Validators.required, Validators.maxLength(64)]),
    surname: this.fb.control("", [Validators.required, Validators.maxLength(64)]),
    middleName: this.fb.control("", [Validators.maxLength(64)]),
    phoneNumber: this.fb.control("", [Validators.pattern("\d{10}")]),
    birthDate: this.fb.control("")
  });
}
