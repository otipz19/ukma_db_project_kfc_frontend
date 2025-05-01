import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {MealsWeightRangeFilterDto} from "../../../../../data-access/filters/meals-weight-range.filter-model";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";

@Component({
  selector: 'app-meals-weight-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './meals-weight-range-filter-form.component.html',
  styleUrl: './meals-weight-range-filter-form.component.scss'
})
export class MealsWeightRangeFilterFormComponent implements UpsertDialogFormComponent<MealsWeightRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<MealsWeightRangeFilterDto>>({
    minWeight: this.fb.control(undefined, [Validators.min(0)]),
    maxWeight: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: MealsWeightRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): MealsWeightRangeFilterDto {
    return this.form.getRawValue();
  }
}
