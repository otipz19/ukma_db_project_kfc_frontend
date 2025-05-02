import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  RestaurantsStatsOrdersDateRangeFilterDto
} from "../../../data-access/model/restaurants-stats-orders-date-range-filter.model";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent
  ],
  templateUrl: './restaurants-stats-orders-date-range-filter-form.component.html',
  styleUrl: './restaurants-stats-orders-date-range-filter-form.component.scss'
})
export class RestaurantsStatsOrdersDateRangeFilterFormComponent implements UpsertDialogFormComponent<RestaurantsStatsOrdersDateRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<RestaurantsStatsOrdersDateRangeFilterDto>>({
    fromDate: this.fb.control(undefined, [Validators.min(0)]),
    toDate: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: RestaurantsStatsOrdersDateRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): RestaurantsStatsOrdersDateRangeFilterDto {
    return this.form.getRawValue();
  }
}
