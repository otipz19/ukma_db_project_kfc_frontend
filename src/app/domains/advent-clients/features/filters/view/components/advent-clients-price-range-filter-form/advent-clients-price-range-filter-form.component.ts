import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {AdventClientsPriceRangeFilterDto} from "../../../data-access/model/advent-clients-price-range.filter-model";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './advent-clients-price-range-filter-form.component.html',
  styleUrl: './advent-clients-price-range-filter-form.component.scss'
})
export class AdventClientsPriceRangeFilterFormComponent implements UpsertDialogFormComponent<AdventClientsPriceRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<AdventClientsPriceRangeFilterDto>>({
    minPrice: this.fb.control(undefined, [Validators.min(0)]),
    maxPrice: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: AdventClientsPriceRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): AdventClientsPriceRangeFilterDto {
    return this.form.getRawValue();
  }
}
