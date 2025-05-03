import {Component, inject} from '@angular/core';
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {IngredientsMinMealPriceFilterDto} from "../../../data-access/model/ingredients-min-meal-price.filter-model";

@Component({
  selector: 'app-meals-price-filter',
  imports: [
    ReactiveFormsModule,
    CommonFormInputFieldComponent
  ],
  templateUrl: './valuable-ingredient-min-meal-price-filter-form.component.html',
  styleUrl: './valuable-ingredient-min-meal-price-filter-form.component.scss'
})
export class ValuableIngredientMinMealPriceFilterFormComponent implements UpsertDialogFormComponent<IngredientsMinMealPriceFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<IngredientsMinMealPriceFilterDto>>({
    minMealPrice: this.fb.control(0, [Validators.min(0)]),
  });

  initByValue(value: IngredientsMinMealPriceFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): IngredientsMinMealPriceFilterDto {
    return this.form.getRawValue();
  }
}
