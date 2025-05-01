import {Component, inject} from '@angular/core';
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  MealsEnergeticValueRangeFilterDto
} from "../../../../../data-access/filters/meals-energetic-value-range.filter-model";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";

@Component({
  selector: 'app-meals-energetic-value-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './meals-energetic-value-range-filter-form.component.html',
  styleUrl: './meals-energetic-value-range-filter-form.component.scss'
})
export class MealsEnergeticValueRangeFilterFormComponent implements UpsertDialogFormComponent<MealsEnergeticValueRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<MealsEnergeticValueRangeFilterDto>>({
    minEnergeticValue: this.fb.control(undefined, [Validators.min(0)]),
    maxEnergeticValue: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: MealsEnergeticValueRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): MealsEnergeticValueRangeFilterDto {
    return this.form.getRawValue();
  }
}
