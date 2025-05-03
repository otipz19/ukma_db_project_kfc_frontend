import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import { EmployeeStatsTotalOrdersPriceRangeFilterDto } from '../../../data-access/model/employee-stats-total-orders-price-range-filter.model';

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './employee-stats-total-orders-price-range-filter-form.component.html',
  styleUrl: './employee-stats-total-orders-price-range-filter-form.component.scss'
})
export class EmployeeStatsTotalOrdersPriceRangeFilterFormComponent implements UpsertDialogFormComponent<EmployeeStatsTotalOrdersPriceRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<EmployeeStatsTotalOrdersPriceRangeFilterDto>>({
    minTotalOrdersPrice: this.fb.control(undefined, [Validators.min(0)]),
    maxTotalOrdersPrice: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: EmployeeStatsTotalOrdersPriceRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): EmployeeStatsTotalOrdersPriceRangeFilterDto {
    return this.form.getRawValue();
  }
}
