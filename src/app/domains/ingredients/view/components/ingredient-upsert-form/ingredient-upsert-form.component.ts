import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  CommonFormInputFieldComponent
} from "../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {
  UpsertDialogFormComponent
} from "../../../../../shared/features/upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {ControlsOf} from "../../../../../shared/type-utils/controls-of";
import {CreateIngredient} from "../../../../../api/model/createIngredient";
import {
  ImageDropZoneComponent
} from "../../../../../shared/features/images/view/components/image-drop-zone/image-drop-zone.component";

export type CreateIngredientWithImage = {
  ingredient: CreateIngredient;
  image?: File;
}

@Component({
  selector: 'app-ingredient-upsert-form',
  imports: [
    ReactiveFormsModule,
    CommonFormInputFieldComponent,
    ImageDropZoneComponent
  ],
  templateUrl: './ingredient-upsert-form.component.html',
  styleUrl: './ingredient-upsert-form.component.scss'
})
export class IngredientUpsertFormComponent implements UpsertDialogFormComponent<CreateIngredientWithImage> {
  private readonly fb = inject(FormBuilder).nonNullable;

  private image?: File;

  protected readonly form: FormGroup<ControlsOf<CreateIngredient>> = this.fb.group({
    title: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    energeticValue: this.fb.control(0, [Validators.required, Validators.min(0)]),
    weight: this.fb.control(0, [Validators.required, Validators.min(0)]),
    price: this.fb.control(0, [Validators.required, Validators.min(0)]),
  });

  initByValue(value: CreateIngredientWithImage): void {
    const {image, ingredient} = value;
    this.image = image;
    this.form.patchValue(ingredient);
    this.form.controls.title.disable();
  }

  validate(): boolean {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  getFormValue(): CreateIngredientWithImage {
    const ingredient = this.form.getRawValue();
    return {image: this.image, ingredient};
  }

  protected onFileUpdate(file: File | undefined) {
    this.image = file;
  }
}
