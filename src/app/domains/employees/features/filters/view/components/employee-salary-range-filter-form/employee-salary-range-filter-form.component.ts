import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {
  EmployeeSalaryRangeFilterDto
} from "../../../data-access/model/filter-models/employee-salary-range.filter-model";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './employee-salary-range-filter-form.component.html',
  styleUrl: './employee-salary-range-filter-form.component.scss'
})
export class EmployeeSalaryRangeFilterFormComponent implements UpsertDialogFormComponent<EmployeeSalaryRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<EmployeeSalaryRangeFilterDto>>({
    minSalary: this.fb.control(undefined, [Validators.min(0)]),
    maxSalary: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: EmployeeSalaryRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): EmployeeSalaryRangeFilterDto {
    return this.form.getRawValue();
  }
}
