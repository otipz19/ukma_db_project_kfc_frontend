import {Component, computed, DestroyRef, inject, OnInit, output, signal} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatButton, MatIconButton} from "@angular/material/button";
import {OrderMeal} from "../../../data-access/types/order-meal";
import {SelectMealDialogComponent, SelectMealDialogData} from "../select-meal-dialog/select-meal-dialog.component";
import {Meal} from "../../../../../../../api/model/meal";
import {IngredientControllerService} from "../../../../../../../api/api/ingredientController.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {OrderMealIngredient} from "../../../data-access/types/order-meal-ingredient";
import {OrderMealCardComponent} from "../order-meal-card/order-meal-card.component";
import {Location} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-create-order-form',
  imports: [
    MatButton,
    OrderMealCardComponent,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './create-order-form.component.html',
  styleUrl: './create-order-form.component.scss'
})
export class CreateOrderFormComponent implements OnInit {
  private static LS_KEY = 'CREATE_ORDER_FORM_LS_KEY';

  private readonly matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ingredientsApi = inject(IngredientControllerService);
  private readonly notify = inject(NotifyService);
  private readonly location = inject(Location);

  protected readonly submit = output<OrderMeal[]>();

  protected readonly $meals = signal<OrderMeal[]>([]);

  protected readonly $totalPrice = computed(() => {
    return this.$meals()
      .reduce((sum, meal) => sum + meal.price * meal.amount, 0);
  });

  ngOnInit() {
    const fromLS = localStorage.getItem(CreateOrderFormComponent.LS_KEY);
    if(fromLS) {
      const meals: OrderMeal[] = JSON.parse(fromLS);
      this.$meals.set(meals);
    }
  }

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
    const ingredientsIds = meal.ingredients.map(m => m.ingredientId);
    this.ingredientsApi.getAllIngredients(ingredientsIds)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.notify.notifyError()
      )
      .subscribe(ingredients => {
        const orderMealIngredients: OrderMealIngredient[] = ingredients.map(i => {
          const mealIngredient = meal.ingredients.find(mi => mi.ingredientId === i.id)!;
          return {...i, ...mealIngredient};
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
        CreateOrderFormComponent.saveOrderMealsToLS(this.$meals());
      });
  }

  protected onUpdate() {
    this.$meals.update(v => [...v]);
    CreateOrderFormComponent.saveOrderMealsToLS(this.$meals());
  }

  protected onDelete(id: OrderMeal['id']) {
    this.$meals.update(list => {
      return list.filter(m => m.id !== id);
    });
    CreateOrderFormComponent.saveOrderMealsToLS(this.$meals());
  }

  protected onClear() {
    this.$meals.set([]);
    CreateOrderFormComponent.clearOrderMealsFromLS();
  }

  protected onCancel() {
    localStorage.removeItem(CreateOrderFormComponent.LS_KEY);
    this.location.back();
  }

  protected onSubmit() {
    this.submit.emit(this.$meals());
  }

  static clearOrderMealsFromLS() {
    localStorage.removeItem(CreateOrderFormComponent.LS_KEY);
  }

  static saveOrderMealsToLS(meals: OrderMeal[]) {
    localStorage.setItem(CreateOrderFormComponent.LS_KEY, JSON.stringify(meals));
  }
}
