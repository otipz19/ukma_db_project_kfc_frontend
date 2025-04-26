import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  viewChild,
  viewChildren
} from '@angular/core';
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
import {Meal} from "../../../../../../../api/model/meal";
import {IngredientControllerService} from "../../../../../../../api/api/ingredientController.service";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {MealStats, MealStatsComponent} from "../meal-stats/meal-stats.component";

type MealDataStepFormType = Omit<UpdateMeal, 'ingredients'>

type MealIngredientCombinedDto = {
  ingredient: Ingredient,
  mealIngredient: MealIngredient
};

@Component({
  selector: 'app-meal-upsert-form',
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
    MealStatsComponent,
  ],
  templateUrl: './meal-upsert-form.component.html',
  styleUrl: './meal-upsert-form.component.scss'
})
export class MealUpsertFormComponent implements OnInit {
  private readonly ingredientsApi = inject(IngredientControllerService);
  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly matDialog = inject(MatDialog);
  private readonly notify = inject(NotifyService);
  private readonly destroyRef = inject(DestroyRef);

  readonly $initialValue = input<Meal | undefined>(undefined, {alias: 'initialValue'});

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

  protected readonly $mealStats = computed(() => {
    const {additionalPrice} = this.mealDataStepForm.getRawValue();

    const mealStats: MealStats = {
      price: additionalPrice,
      weight: 0,
      energeticValue: 0
    };

    for(const dto of this.$ingredients()) {
      mealStats.price += dto.ingredient.price * dto.mealIngredient.amount;
      mealStats.energeticValue += dto.ingredient.energeticValue * dto.mealIngredient.amount;
      mealStats.weight += dto.ingredient.weight * dto.mealIngredient.amount;
    }

    return mealStats;
  });

  private readonly $matStepper = viewChild(MatStepper);

  ngOnInit() {
    const initValue = this.$initialValue();
    if(initValue) {
      const {title, additionalPrice, description, recipe, ingredients: mealIngredients} = initValue;
      this.mealDataStepForm.patchValue({title, additionalPrice, description, recipe});
      this.ingredientsApi.getAllIngredients([...mealIngredients.map(i => i.ingredientId)])
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          this.notify.notifyError()
        )
        .subscribe(ingredients => {
          const dtos: MealIngredientCombinedDto[] = ingredients.map(ingredient => {
            const mealIngredient = mealIngredients
              .find(m => m.ingredientId === ingredient.id)!;
            return {ingredient, mealIngredient};
          });
          this.$ingredients.set(dtos);
        });
    }
  }

  protected onSubmit() {
    if(this.mealDataStepForm.invalid) {
      this.mealDataStepForm.markAllAsTouched();
      this.$matStepper()?.previous();
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
