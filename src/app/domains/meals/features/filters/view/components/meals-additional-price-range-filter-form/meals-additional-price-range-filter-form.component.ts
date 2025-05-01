import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  MealsAdditionalPriceRangeFilterDto
} from "../../../../../data-access/filters/meals-additional-price-range.filter-model";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";

@Component({
  selector: 'app-meals-additional-price-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './meals-additional-price-range-filter-form.component.html',
  styleUrl: './meals-additional-price-range-filter-form.component.scss'
})
export class MealsAdditionalPriceRangeFilterFormComponent implements UpsertDialogFormComponent<MealsAdditionalPriceRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<MealsAdditionalPriceRangeFilterDto>>({
    minAdditionalPrice: this.fb.control(undefined, [Validators.min(0)]),
    maxAdditionalPrice: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: MealsAdditionalPriceRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): MealsAdditionalPriceRangeFilterDto {
    return this.form.getRawValue();
  }
}
