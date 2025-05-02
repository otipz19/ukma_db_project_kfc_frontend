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
  RestaurantsStatsOrdersNumberRangeFilterDto
} from "../../../data-access/model/restaurants-stats-orders-number-range.filter-model";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './restaurants-stats-order-number-range-filter-form.component.html',
  styleUrl: './restaurants-stats-order-number-range-filter-form.component.scss'
})
export class RestaurantsStatsOrderNumberRangeFilterFormComponent implements UpsertDialogFormComponent<RestaurantsStatsOrdersNumberRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<RestaurantsStatsOrdersNumberRangeFilterDto>>({
    minNumberOfOrders: this.fb.control(undefined, [Validators.min(0)]),
    maxNumberOfOrders: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: RestaurantsStatsOrdersNumberRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): RestaurantsStatsOrdersNumberRangeFilterDto {
    return this.form.getRawValue();
  }
}
