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
  EmployeeStatsOrdersNumberRangeFilterDto,
} from "../../../data-access/model/employee-stats-orders-number-range-filter.model";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './employee-stats-order-number-range-filter-form.component.html',
  styleUrl: './employee-stats-order-number-range-filter-form.component.scss'
})
export class EmployeeStatsOrderNumberRangeFilterFormComponent implements UpsertDialogFormComponent<EmployeeStatsOrdersNumberRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<EmployeeStatsOrdersNumberRangeFilterDto>>({
    minNumberOfOrders: this.fb.control(undefined, [Validators.min(0)]),
    maxNumberOfOrders: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: EmployeeStatsOrdersNumberRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): EmployeeStatsOrdersNumberRangeFilterDto {
    return this.form.getRawValue();
  }
}
