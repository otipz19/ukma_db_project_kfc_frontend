import {Component, inject} from '@angular/core';
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {MealsPriceRangeFilterDto} from "../../../../../data-access/filters/meals-price-range.filter-model";

@Component({
  selector: 'app-meals-price-filter',
  imports: [
    ReactiveFormsModule,
    CommonFormInputFieldComponent
  ],
  templateUrl: './meals-price-range-filter-form.component.html',
  styleUrl: './meals-price-range-filter-form.component.scss'
})
export class MealsPriceRangeFilterFormComponent implements UpsertDialogFormComponent<MealsPriceRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<MealsPriceRangeFilterDto>>({
    minPrice: this.fb.control(undefined, [Validators.min(0)]),
    maxPrice: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: MealsPriceRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): MealsPriceRangeFilterDto {
    return this.form.getRawValue();
  }
}
