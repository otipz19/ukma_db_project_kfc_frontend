import {Component, inject, input, OnInit, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {UpdateEmployee} from "../../../../../../../api";
import {EmployeeStoreEntity} from "../../../../../data-access/model/employee-store-entity";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-update-employee-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent,
    CommonFormInputFieldComponent,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './update-employee-form.component.html',
  styleUrl: './update-employee-form.component.scss'
})
export class UpdateEmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<UpdateEmployee>>({
    passportNumber: this.fb.control('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]),
    firstName: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    surname: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    middleName: this.fb.control('', [Validators.maxLength(64)]),
    birthDate: this.fb.control('', [Validators.required]),
    salary: this.fb.control(null as any, [Validators.required])
  });

  readonly $initialValue = input.required<EmployeeStoreEntity>({alias: 'initialValue'});

  protected readonly submit = output<UpdateEmployee>();
  protected readonly cancel = output<void>();

  ngOnInit() {
    const {passportNumber, firstName, surname, middleName, birthDate, salary} = this.$initialValue();
    this.form.patchValue({passportNumber, firstName, salary, middleName, birthDate, surname});
  }

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.submit.emit(value);
  }

  onCancel() {
    this.cancel.emit();
  }
}
