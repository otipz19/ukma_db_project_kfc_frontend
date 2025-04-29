import {Component, inject} from '@angular/core';
import {
  CreateOrderFormComponent
} from "../../../features/create-order/view/components/create-order-form/create-order-form.component";
import {OrderMeal} from "../../../features/create-order/data-access/types/order-meal";
import {OrderControllerService} from "../../../../../api/api/orderController.service";
import {CreateClientMeal} from "../../../../../api/model/createClientMeal";
import {ClientMealIngredient} from "../../../../../api/model/clientMealIngredient";
import {
  CurrentRestaurantService
} from "../../../../restaurants/features/current-restaurant/data-access/services/current-restaurant.service";
import {AuthService} from "../../../../../core/services/auth.service";
import {CreateOrder} from "../../../../../api/model/createOrder";
import {map, switchMap} from "rxjs";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {Location} from "@angular/common";
import {OrderStateService} from "../../../features/create-order/data-access/services/order-state.service";

@Component({
  selector: 'app-create-order-page',
  imports: [
    CreateOrderFormComponent
  ],
  templateUrl: './create-order-page.component.html',
  styleUrl: './create-order-page.component.scss'
})
export class CreateOrderPageComponent {
  private readonly orderApi = inject(OrderControllerService);
  private readonly currentRestaurantService = inject(CurrentRestaurantService);
  private readonly authService = inject(AuthService);
  private readonly notify = inject(NotifyService);
  private readonly location = inject(Location);
  private readonly orderStateService = inject(OrderStateService);

  protected onCancel() {
    this.orderStateService.clearOrderState();
    this.location.back();
  }

  protected onSubmit(meals: OrderMeal[]) {
    const apiMeals: CreateClientMeal[] = meals.map(m => {
      const apiIngredients: ClientMealIngredient[] = m.ingredients.map(i => {
        const {id, amount} = i;
        return {ingredientId: id, amount};
      });

      return {
        mealId: m.id,
        amountInOrder: m.amount,
        ingredientOverrides: apiIngredients
      };
    });

    this.currentRestaurantService.getCurrentRestaurant$()
      .pipe(
        map(restaurant => {
          const order: CreateOrder = {
            clientMeals: apiMeals,
            restaurantId: restaurant.id,
          };

          const userId = this.authService.$currentUser()!.id;
          if (this.authService.$isEmployee()) {
            order.employeeUserId = userId;
          } else {
            order.clientUserId = userId;
          }

          return order;
        }),
        switchMap(order => {
          return this.orderApi.createOrder(order);
        }),
        this.notify.notifyHttpRequest()
      )
      .subscribe(() => {
        this.orderStateService.clearOrderState();
        this.location.back();
      });
  }
}
