import {Component, inject, input, OnInit, output} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {IngredientDto} from "../../../model/ingredient-dto";
import {IngredientViewDto} from "../../../model/ingredient-view-dto";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {
  CommonFormInputFieldComponent
} from "../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";

@Component({
  selector: 'app-ingredient-upsert-form',
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
    MatLabel,
    CommonFormInputFieldComponent
  ],
  templateUrl: './ingredient-upsert-form.component.html',
  styleUrl: './ingredient-upsert-form.component.scss'
})
export class IngredientUpsertFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly form = this.fb.group({
    title: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    energy: this.fb.control(0, [Validators.required, Validators.min(0)]),
    weight: this.fb.control(0, [Validators.required, Validators.min(0)]),
    price: this.fb.control(0, [Validators.required, Validators.min(0)]),
    image: this.fb.control('', [Validators.required, Validators.maxLength(2048)])
  });

  readonly $initialData = input<IngredientDto | undefined>(undefined, {alias: 'initialData'});

  protected readonly submit = output<IngredientViewDto>();
  protected readonly cancel = output<void>();

  ngOnInit() {
    const initData = this.$initialData();
    if (initData) {
      this.form.patchValue(initData);
    }
  }

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAsTouched();
      return;
    }

    const data = {...this.form.getRawValue(), };
    this.submit.emit(data);
  }

  onCancel() {
    this.cancel.emit();
  }
}
