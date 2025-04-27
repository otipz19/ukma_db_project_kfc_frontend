import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {UpdateEmployee} from "../../../../../../../api/model/updateEmployee";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";

export type UpdateEmployeeDataFormValue = Omit<UpdateEmployee, 'salary'>;

@Component({
  selector: 'app-update-employee-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent,
    CommonFormInputFieldComponent,
  ],
  templateUrl: './update-employee-form.component.html',
  styleUrl: './update-employee-form.component.scss'
})
export class UpdateEmployeeFormComponent implements UpsertDialogFormComponent<UpdateEmployeeDataFormValue> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<UpdateEmployeeDataFormValue>>({
    passportNumber: this.fb.control('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    firstName: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    surname: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    middleName: this.fb.control('', [Validators.maxLength(64)]),
    birthDate: this.fb.control('', [Validators.required]),
  });

  initByValue(value: UpdateEmployeeDataFormValue): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  getFormValue(): UpdateEmployeeDataFormValue {
    return this.form.getRawValue();
  }
}
