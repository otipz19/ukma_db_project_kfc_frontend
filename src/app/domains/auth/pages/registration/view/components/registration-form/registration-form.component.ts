import {Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";
import {passwordsEqualValidator} from "../../../../../../../shared/form/validators/passwords-equal.validator";
import {MatError} from "@angular/material/form-field";
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
import {ClientRegistrationService} from "../../../../../data-access/services/client-registration.service";
import {RegisterClientDto} from "../../../../../data-access/model/register-client.dto";
import {Router} from "@angular/router";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {phoneNumberFormatValidator} from "../../../../../../../shared/form/validators/phone-number-format.validator";

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
  private readonly registrationService = inject(ClientRegistrationService);
  private readonly router = inject(Router);
  private readonly notifyService = inject(NotifyService);
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly firstStepForm = this.fb.group({
    username: this.fb.control("", [Validators.required, Validators.maxLength(320)]),
    password: this.fb.control("", [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
    passwordConfirm: this.fb.control("", [Validators.required, Validators.minLength(5), Validators.maxLength(64)]),
  }, {
    validators: [passwordsEqualValidator()]
  });

  protected readonly secondStepForm = this.fb.group({
    firstName: this.fb.control("", [Validators.required, Validators.maxLength(64)]),
    surname: this.fb.control("", [Validators.required, Validators.maxLength(64)]),
    middleName: this.fb.control("", [Validators.maxLength(64)]),
    phoneNumber: this.fb.control("", [phoneNumberFormatValidator()]),
    birthDate: this.fb.control("")
  });

  protected onSubmit() {
    if (this.firstStepForm.invalid || this.secondStepForm.invalid) {
      this.firstStepForm.markAllAsTouched();
      this.secondStepForm.markAllAsTouched();
      return;
    }

    const {username, password} = this.firstStepForm.getRawValue();
    const dto: RegisterClientDto = {username, password, ...this.secondStepForm.getRawValue()};

    this.registrationService.register$(dto)
      .pipe(
        this.notifyService.notifyHttpError()
      )
      .subscribe(() => {
        this.router.navigate(['/', 'landing']);
      });
  }
}
