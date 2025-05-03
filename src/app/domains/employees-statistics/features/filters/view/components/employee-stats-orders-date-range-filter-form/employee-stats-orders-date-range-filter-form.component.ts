import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {
  EmployeeStatsOrdersDateRangeFilterDto
} from "../../../data-access/model/employee-stats-orders-date-range-filter.model";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent
  ],
  templateUrl: './employee-stats-orders-date-range-filter-form.component.html',
  styleUrl: './employee-stats-orders-date-range-filter-form.component.scss'
})
export class EmployeeStatsOrdersDateRangeFilterFormComponent implements UpsertDialogFormComponent<EmployeeStatsOrdersDateRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<EmployeeStatsOrdersDateRangeFilterDto>>({
    fromDate: this.fb.control(undefined, [Validators.min(0)]),
    toDate: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: EmployeeStatsOrdersDateRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): EmployeeStatsOrdersDateRangeFilterDto {
    return this.form.getRawValue();
  }
}
