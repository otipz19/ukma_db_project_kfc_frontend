import {Component, inject} from '@angular/core';
import {
  UpsertDialogFormComponent
} from "../../../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {
  CommonFormDatepickerFieldComponent
} from "../../../../../../../shared/form/components/common-form-datepicker-field/common-form-datepicker-field.component";
import {
  ClientBirthDateRangeFilterDto
} from "../../../data-access/model/filter-models/client-birth-date-range.filter-model";

@Component({
  selector: 'app-client-birth-date-range-filter-form',
  imports: [
    ReactiveFormsModule,
    CommonFormDatepickerFieldComponent
  ],
  templateUrl: './client-birth-date-range-filter-form.component.html',
  styleUrl: './client-birth-date-range-filter-form.component.scss'
})
export class ClientBirthDateRangeFilterFormComponent implements UpsertDialogFormComponent<ClientBirthDateRangeFilterDto> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<ClientBirthDateRangeFilterDto>>({
    minBirthDate: this.fb.control(undefined, [Validators.min(0)]),
    maxBirthDate: this.fb.control(undefined, [Validators.min(0)])
  });

  initByValue(value: ClientBirthDateRangeFilterDto): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }
    return true;
  }

  getFormValue(): ClientBirthDateRangeFilterDto {
    return this.form.getRawValue();
  }
}
