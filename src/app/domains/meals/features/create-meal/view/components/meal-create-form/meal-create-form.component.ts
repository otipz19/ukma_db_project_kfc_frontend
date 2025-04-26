import {Component, inject, output, signal, viewChildren} from '@angular/core';
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

type MealDataStepFormType = Omit<UpdateMeal, 'ingredients'>

type MealIngredientCombinedDto = {
  ingredient: Ingredient,
  mealIngredient: MealIngredient
};

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

  protected readonly $ingredients = signal<MealIngredientCombinedDto[]>([]);
  protected readonly $mealIngredientCards = viewChildren(MealIngredientCardComponent);

  protected onSubmit() {
    if(this.mealDataStepForm.invalid) {
      this.mealDataStepForm.markAllAsTouched();
      return;
    }

    const mealIngredients = this.$mealIngredientCards()
      .map(card => card.getMealIngredient());

    const dataFormValue = this.mealDataStepForm.getRawValue();

    const updateMealDto: UpdateMeal = {
      ingredients: mealIngredients,
      ...dataFormValue
    };

    this.submit.emit(updateMealDto);
  }

  protected onCancel() {
    this.cancel.emit();
  }

  protected onAddIngredient() {
    const dialogRef = this.matDialog.open<AddIngredientDialogComponent, AddIngredientDialogData, Ingredient>(
      AddIngredientDialogComponent,
      {
        data: {
          alreadyPresentIngredientsIdList: this.$ingredients().map(dto => dto.ingredient.id)
        }
      }
    );

    dialogRef.afterClosed()
      .subscribe(ingredient => {
        if (ingredient) {
          this.addNew(ingredient);
        }
      });
  }

  private addNew(ingredient: Ingredient) {
    const mealIngredient: MealIngredient = {
      ingredientId: ingredient.id,
      isFixated: false,
      amount: 1
    };

    this.$ingredients.update(list => {
      list.unshift({mealIngredient, ingredient});
      return list;
    })
  }

  protected onDeleteIngredient(id: Ingredient['id']) {
    this.$ingredients.update(list => {
      return list.filter(i => i.ingredient.id !== id);
    });
  }

  protected onIngredientUp(id: Ingredient['id']) {
    this.$ingredients.update(list => {
      const index = list.findIndex(i => i.ingredient.id === id);
      if(index > 0) {
        const aux = list[index];
        list[index] = list[index - 1];
        list[index - 1] = aux;
      }

      return [...list];
    });
  }

  protected onIngredientDown(id: Ingredient['id']) {
    this.$ingredients.update(list => {
      const index = list.findIndex(i => i.ingredient.id === id);
      if(index < list.length - 1) {
        const aux = list[index];
        list[index] = list[index + 1];
        list[index + 1] = aux;
      }

      return [...list];
    });
  }
}
