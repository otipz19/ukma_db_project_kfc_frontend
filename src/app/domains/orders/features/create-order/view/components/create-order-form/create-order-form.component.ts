import {Component, DestroyRef, inject, signal} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {OrderMeal} from "../../../data-access/types/order-meal";
import {SelectMealDialogComponent, SelectMealDialogData} from "../select-meal-dialog/select-meal-dialog.component";
import {Meal} from "../../../../../../../api/model/meal";
import {IngredientControllerService} from "../../../../../../../api/api/ingredientController.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {OrderMealIngredient} from "../../../data-access/types/order-meal-ingredient";
import {OrderMealCardComponent} from "../order-meal-card/order-meal-card.component";

@Component({
  selector: 'app-create-order-form',
  imports: [
    MatButton,
    OrderMealCardComponent
  ],
  templateUrl: './create-order-form.component.html',
  styleUrl: './create-order-form.component.scss'
})
export class CreateOrderFormComponent {
  private readonly matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ingredientsApi = inject(IngredientControllerService);
  private readonly notify = inject(NotifyService);

  protected readonly $meals = signal<OrderMeal[]>([]);

  protected onAddMeal() {
    const dialogRef = this.matDialog.open<SelectMealDialogComponent, SelectMealDialogData, Meal>(
      SelectMealDialogComponent,
      {
        data: {
          alreadyPresentMealsIdList: this.$meals().map(m => m.id)
        },
        minWidth: '800px',
        minHeight: '400px'
      }
    );

    dialogRef.afterClosed()
      .subscribe(meal => {
        if (meal) {
          this.loadNewOrderMeal(meal);
        }
      });
  }

  private loadNewOrderMeal(meal: Meal) {
    const notFixatedIngredientsIds = meal.ingredients
      .filter(i => !i.isFixated)
      .map(i => i.ingredientId);

    this.ingredientsApi.getAllIngredients(notFixatedIngredientsIds)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.notify.notifyError()
      )
      .subscribe(ingredients => {
        const orderMealIngredients: OrderMealIngredient[] = ingredients.map(i => {
          const mealIngredient = meal.ingredients.find(mi => mi.ingredientId === i.id);
          return {...i, amount: mealIngredient!.amount};
        });

        const {id, title, additionalPrice, price, weight, energeticValue} = meal;
        const orderMeal: OrderMeal = {
          id,
          title,
          additionalPrice,
          price,
          weight,
          energeticValue,
          amount: 1,
          ingredients: orderMealIngredients
        };

        this.$meals.update(list => {
          list.push(orderMeal);
          return [...list];
        });
      });
  }
}
