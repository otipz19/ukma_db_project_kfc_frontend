import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  UpsertDialogFormComponent
} from "../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {ControlsOf} from "../../../../../shared/type-utils/controls-of";
import {
  CommonFormInputFieldComponent
} from "../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {UpdateRestaurant} from "../../../../../api/model/updateRestaurant";

@Component({
  selector: 'app-restaurant-upsert-form',
  imports: [
    CommonFormInputFieldComponent,
    ReactiveFormsModule
  ],
  templateUrl: './restaurant-upsert-form.component.html',
  styleUrl: './restaurant-upsert-form.component.scss'
})
export class RestaurantUpsertFormComponent implements UpsertDialogFormComponent<UpdateRestaurant> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group<ControlsOf<UpdateRestaurant>>({
    address: this.fb.control('', [Validators.required, Validators.maxLength(320)])
  });

  initByValue(value: UpdateRestaurant): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  getFormValue(): UpdateRestaurant {
    return this.form.getRawValue();
  }
}
