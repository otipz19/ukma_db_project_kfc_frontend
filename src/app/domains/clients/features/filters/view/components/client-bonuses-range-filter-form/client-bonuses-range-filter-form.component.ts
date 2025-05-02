import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {ClientBonusesRangeFilterDto} from "../../../data-access/model/filter-models/client-bonuses-range.filter-model";


@Component({
  selector: 'app-client-bonuses-range-filter-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './client-bonuses-range-filter-form.component.html',
  styleUrl: './client-bonuses-range-filter-form.component.scss'
})
export class ClientBonusesRangeFilterFormComponent implements UpsertDialogFormComponent<ClientBonusesRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<ClientBonusesRangeFilterDto>>({
    minBonuses: this.fb.control(undefined, [Validators.min(0)]),
    maxBonuses: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: ClientBonusesRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): ClientBonusesRangeFilterDto {
    return this.form.getRawValue();
  }
}
