import {Component, inject} from '@angular/core';
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {OrdersDateCreatedRangeFilterDto} from "../../../data-access/model/orders-date-created-range-filter.model";

@Component({
  selector: 'app-orders-date-created-range-filter-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent
  ],
  templateUrl: './orders-date-created-range-filter-form.component.html',
  styleUrl: './orders-date-created-range-filter-form.component.scss'
})
export class OrdersDateCreatedRangeFilterFormComponent implements UpsertDialogFormComponent<OrdersDateCreatedRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<OrdersDateCreatedRangeFilterDto>>({
    minDateCreated: this.fb.control(undefined, [Validators.min(0)]),
    maxDateCreated: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: OrdersDateCreatedRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): OrdersDateCreatedRangeFilterDto {
    return this.form.getRawValue();
  }
}
