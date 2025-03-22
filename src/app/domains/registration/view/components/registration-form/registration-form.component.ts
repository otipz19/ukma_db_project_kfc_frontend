import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {passwordsEqualValidator} from "../../validators/passwordsEqual.validator";
import {MatError, MatFormField, MatHint, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {getFormControlNames} from "../../../../../shared/form/utils/get-form-control-names";
import {emailValidator} from "../../../../../shared/form/validators/email.validator";
import {getErrorMessage} from "../../../../../shared/form/utils/get-error-message";
import {ErrorMessagePipe} from "../../../../../shared/form/pipes/error-message.pipe";

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
        MatFormField,
        MatInput,
        MatLabel,
        MatPrefix,
        MatHint,
        MatError,
        ErrorMessagePipe,
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

  protected readonly firstStepControlNames = getFormControlNames(this.firstStepForm);
  protected readonly secondStepControlNames = getFormControlNames(this.secondStepForm);
  protected readonly getErrorMessage = getErrorMessage;
}
