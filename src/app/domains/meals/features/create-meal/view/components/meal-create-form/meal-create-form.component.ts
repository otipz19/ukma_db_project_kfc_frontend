import {Component, inject, output} from '@angular/core';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {UpdateMeal} from "../../../../../../../api/model/updateMeal";
import {ControlsOf} from "../../../../../../../shared/type-utils/controls-of";
import {MatButton} from "@angular/material/button";
import {
  CommonFormInputFieldComponent
} from "../../../../../../../shared/form/components/common-form-input-field/common-form-input-field.component";
import {MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatIcon} from "@angular/material/icon";
import {MatDialog} from "@angular/material/dialog";
import {
  AddIngredientDialogComponent,
  AddIngredientDialogData
} from "../add-ingredient-dialog/add-ingredient-dialog.component";
import {Ingredient} from "../../../../../../../api/model/ingredient";

type MealDataStepFormType = Omit<UpdateMeal, 'ingredients'>

@Component({
  selector: 'app-meal-create-form',
  imports: [
    MatStepper,
    MatStep,
    MatStepLabel,
    ReactiveFormsModule,
    MatButton,
    MatStepperNext,
    CommonFormInputFieldComponent,
    MatFormField,
    MatInput,
    CdkTextareaAutosize,
    MatLabel,
    MatIcon,
    MatSuffix
  ],
  templateUrl: './meal-create-form.component.html',
  styleUrl: './meal-create-form.component.scss'
})
export class MealCreateFormComponent {
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly matDialog = inject(MatDialog);

  protected readonly submit = output<UpdateMeal>();
  protected readonly cancel = output<void>();

  protected readonly mealDataStepForm = this.fb.group<ControlsOf<MealDataStepFormType>>({
    title: this.fb.control('', [Validators.required, Validators.maxLength(64)]),
    additionalPrice: this.fb.control(0, [Validators.required, Validators.min(0)]),
    description: this.fb.control('', [Validators.required, Validators.maxLength(512)]),
    recipe: this.fb.control('', [Validators.required, Validators.maxLength(1024)])
  });

  protected onCancel(){
    this.cancel.emit();
  }

  protected onAddIngredient() {
    const dialogRef= this.matDialog.open<AddIngredientDialogComponent, AddIngredientDialogData, Ingredient>(
      AddIngredientDialogComponent,
      {
        data: {
          alreadyPresentIngredientsIdList: []
        }
      }
    );

    dialogRef.afterClosed()
      .subscribe(ingredient => {

      });
  }
}
