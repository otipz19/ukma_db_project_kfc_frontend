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
  MealStatsClientMealsRangeFilterDto
} from "../../../data-access/model/meal-stats-client-meals-range.filter-model";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './meal-stats-client-meals-range-filter-form.component.html',
  styleUrl: './meal-stats-client-meals-range-filter-form.component.scss'
})
export class MealStatsClientMealsRangeFilterFormComponent implements UpsertDialogFormComponent<MealStatsClientMealsRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<MealStatsClientMealsRangeFilterDto>>({
    minClientMealsCount: this.fb.control(undefined, [Validators.min(0)]),
    maxClientMealsCount: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: MealStatsClientMealsRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): MealStatsClientMealsRangeFilterDto {
    return this.form.getRawValue();
  }
}
