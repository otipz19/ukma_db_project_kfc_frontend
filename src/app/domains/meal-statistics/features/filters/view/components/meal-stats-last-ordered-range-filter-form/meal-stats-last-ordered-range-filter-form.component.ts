import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {
  MealStatsLastOrderedRangeFilterDto
} from "../../../data-access/model/meal-stats-last-ordered-range.filter-model";

@Component({
  selector: 'app-employee-salary-range-filter-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent
  ],
  templateUrl: './meal-stats-last-ordered-range-filter-form.component.html',
  styleUrl: './meal-stats-last-ordered-range-filter-form.component.scss'
})
export class MealStatsLastOrderedRangeFilterFormComponent implements UpsertDialogFormComponent<MealStatsLastOrderedRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<MealStatsLastOrderedRangeFilterDto>>({
    minLastOrderedDate: this.fb.control(undefined, [Validators.min(0)]),
    maxLastOrderedDate: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: MealStatsLastOrderedRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): MealStatsLastOrderedRangeFilterDto {
    return this.form.getRawValue();
  }
}
