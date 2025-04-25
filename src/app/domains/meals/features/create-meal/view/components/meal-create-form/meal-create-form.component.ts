import {Component, inject, OnInit, output, signal} from '@angular/core';
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
import {MealIngredientCardComponent} from "../meal-ingredient-card/meal-ingredient-card.component";
import {MealIngredient} from "../../../../../../../api/model/mealIngredient";
import {MealIngredientsListsComponent} from "../meal-ingredients-lists/meal-ingredients-lists.component";
import {MealIngredientsService} from "../../../data-access/services/meal-ingredients.service";
import {MealIngredientFullData} from "../../../data-access/types/meal-ingredient-full-data";
import {MealIngredientsLists} from "../../../data-access/types/meal-ingredients-lists";

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
    MatSuffix,
    MealIngredientCardComponent,
    MealIngredientsListsComponent
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

  protected readonly $ingredientsLists = signal<MealIngredientsLists>({
    required: [],
    optional: [],
    additional: []
  });

  protected onCancel(){
    this.cancel.emit();
  }

  protected onUpdateLists(lists: MealIngredientsLists) {
    this.$ingredientsLists.set({...lists});
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
        if(ingredient) {
          this.addNew(ingredient);
        }
      });
  }

  private addNew(ingredient: Ingredient) {
    this.$ingredientsLists.update(lists => {
      const fullData: MealIngredientFullData = {
        ingredient: ingredient,
        mealIngredient: {
          ingredientId: ingredient.id,
          isFixated: false,
          amount: 1
        }
      };

      lists.optional.unshift(fullData);
      return lists;
    });
  }
}
