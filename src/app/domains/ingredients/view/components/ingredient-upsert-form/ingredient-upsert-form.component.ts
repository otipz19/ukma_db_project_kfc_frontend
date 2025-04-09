import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  CommonFormInputFieldComponent
} from "../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {
  UpsertDialogFormComponent
} from "../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {ControlsOf} from "../../../../../shared/type-utils/controls-of";
import {UpdateIngredient} from "../../../../../api/model/updateIngredient";

@Component({
  selector: 'app-ingredient-upsert-form',
  imports: [
    ReactiveFormsModule,
    CommonFormInputFieldComponent
  ],
  templateUrl: './ingredient-upsert-form.component.html',
  styleUrl: './ingredient-upsert-form.component.scss'
})
export class IngredientUpsertFormComponent implements UpsertDialogFormComponent<UpdateIngredient> {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form: FormGroup<ControlsOf<UpdateIngredient>> = this.fb.group({
    title: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    energeticValue: this.fb.control(0, [Validators.required, Validators.min(0)]),
    weight: this.fb.control(0, [Validators.required, Validators.min(0)]),
    price: this.fb.control(0, [Validators.required, Validators.min(0)]),
  });

  initByValue(value: UpdateIngredient): void {
    this.form.patchValue(value);
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  getFormValue(): UpdateIngredient {
    return this.form.getRawValue();
  }
}
