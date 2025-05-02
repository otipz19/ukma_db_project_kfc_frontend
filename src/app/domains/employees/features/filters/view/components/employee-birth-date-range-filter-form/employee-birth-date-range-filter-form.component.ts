import {Component, inject} from '@angular/core';
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  EmployeeBirthDateRangeFilterDto
} from "../../../data-access/model/filter-models/employee-birth-date-range.filter-model";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";

@Component({
  selector: 'app-employee-birth-date-range-filter-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent
  ],
  templateUrl: './employee-birth-date-range-filter-form.component.html',
  styleUrl: './employee-birth-date-range-filter-form.component.scss'
})
export class EmployeeBirthDateRangeFilterFormComponent implements UpsertDialogFormComponent<EmployeeBirthDateRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<EmployeeBirthDateRangeFilterDto>>({
    minBirthDate: this.fb.control(undefined, [Validators.min(0)]),
    maxBirthDate: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: EmployeeBirthDateRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): EmployeeBirthDateRangeFilterDto {
    return this.form.getRawValue();
  }
}
