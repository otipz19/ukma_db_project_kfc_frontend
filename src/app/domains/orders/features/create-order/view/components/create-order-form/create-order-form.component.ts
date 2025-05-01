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
import {MatIcon} from "@angular/material/icon";
import {OrderStateService} from "../../../data-access/services/order-state.service";

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
  private readonly matDialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);
  private readonly ingredientsApi = inject(IngredientControllerService);
  private readonly notify = inject(NotifyService);
  private readonly orderStateService = inject(OrderStateService);

  protected readonly submit = output<OrderMeal[]>();
  protected readonly cancel = output<void>();

  protected readonly $meals = signal<OrderMeal[]>([]);

  protected readonly $totalPrice = computed(() => {
    return this.$meals()
      .reduce((sum, meal) => sum + meal.price * meal.amount, 0);
  });

  ngOnInit() {
    this.$meals.set(this.orderStateService.getOrderState());
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
    this.ingredientsApi.getIngredientsByFilter({ids: ingredientsIds})
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.notify.notifyError()
      )
      .subscribe(ingredients => {
        const orderMealIngredients: OrderMealIngredient[] = ingredients.items.map(i => {
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
        this.orderStateService.saveOrderState(this.$meals());
      });
  }

  protected onUpdate() {
    this.$meals.update(v => [...v]);
    this.orderStateService.saveOrderState(this.$meals());
  }

  protected onDelete(id: OrderMeal['id']) {
    this.$meals.update(list => {
      return list.filter(m => m.id !== id);
    });
    this.orderStateService.saveOrderState(this.$meals());
  }

  protected onClear() {
    this.$meals.set([]);
    this.orderStateService.clearOrderState();
  }

  protected onCancel() {
    this.cancel.emit();
  }

  protected onSubmit() {
    this.submit.emit(this.$meals());
  }
}
