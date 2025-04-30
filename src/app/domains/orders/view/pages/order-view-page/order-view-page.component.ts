import {Component, DestroyRef, inject, signal} from '@angular/core';
import {getFromResolver} from "../../../../../shared/resolvers/get-from-resolver";
import {ORDER_RESOLVER_KEY} from "../../../data-access/resolvers/order.resolver";
import {Order} from "../../../../../api/model/order";
import {ClientMealControllerService} from "../../../../../api/api/clientMealController.service";
import {MealControllerService} from "../../../../../api/api/mealController.service";
import {ClientMealInfo} from "../../../data-access/types/client-meal-info";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {map, switchMap} from "rxjs";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {Restaurant} from "../../../../../api/model/restaurant";
import {
  EmployeeStoreEntity,
  mapEmployeeToStoreEntity
} from "../../../../employees/data-access/model/employee-store-entity";
import {ClientStoreEntity, mapClientToStoreEntity} from "../../../../clients/data-access/model/client-store-entity";
import {RestaurantControllerService} from "../../../../../api/api/restaurantController.service";
import {ClientControllerService} from "../../../../../api/api/clientController.service";
import {EmployeeControllerService} from "../../../../../api/api/employeeController.service";
import {CommonDataCardComponent} from "../../../../../shared/components/common-data-card/common-data-card.component";
import {EmployeePositionPipe} from "../../../../employees/view/pipes/employee-position.pipe";
import {MatButton} from "@angular/material/button";
import {AuthService} from "../../../../../core/services/auth.service";
import {UserRole} from "../../../../../api";
import {OrderControllerService} from "../../../../../api/api/orderController.service";
import {OrderMealViewCardComponent} from "../../components/order-meal-view-card/order-meal-view-card.component";

@Component({
  selector: 'app-order-view-page',
  imports: [
    CommonDataCardComponent,
    EmployeePositionPipe,
    MatButton,
    OrderMealViewCardComponent
  ],
  templateUrl: './order-view-page.component.html',
  styleUrl: './order-view-page.component.scss'
})
export class OrderViewPageComponent {
  private readonly ordersApi = inject(OrderControllerService);
  private readonly mealsApi = inject(MealControllerService);
  private readonly clientMealsApi = inject(ClientMealControllerService);
  private readonly restaurantsApi = inject(RestaurantControllerService);
  private readonly clientsApi = inject(ClientControllerService);
  private readonly employeeApi = inject(EmployeeControllerService);
  private readonly notify = inject(NotifyService);
  protected readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly $order = signal(getFromResolver<Order>(ORDER_RESOLVER_KEY));
  protected readonly $meals = signal<ClientMealInfo[]>([]);

  protected readonly $restaurant = signal<Restaurant | undefined>(undefined);
  protected readonly $employee = signal<EmployeeStoreEntity | undefined>(undefined);
  protected readonly $client = signal<ClientStoreEntity | undefined>(undefined);

  constructor() {
    const order = this.$order();
    this.loadMeals(order);
    this.loadRestaurant(order);
    this.loadClient(order);
    this.loadEmployee(order);
  }

  // TODO: Fix when api is updated
  private loadMeals(order: Order) {
    this.clientMealsApi.getAllClientMeals(order.id)
      .pipe(
        takeUntilDestroyed(),
        switchMap(clientMeals => {
          const clientMealsIds = clientMeals.map(cm => cm.mealId);
          return this.mealsApi.getAllMeals()
            .pipe(
              map(meals => {
                return meals
                  .filter(m => clientMealsIds.includes(m.id))
                  .map(m => {
                    const clientMeal = clientMeals.find(cm => cm.mealId === m.id)!;
                    const clientMealInfo: ClientMealInfo = {...m, ...clientMeal};
                    return clientMealInfo;
                  });
              })
            )
        }),
        this.notify.notifyError('Помилка завантаження інформації про страви')
      )
      .subscribe(clientMealsInfo => {
        this.$meals.set(clientMealsInfo);
      });
  }

  private loadRestaurant(order: Order) {
    this.restaurantsApi.getRestaurantById(order.restaurantId)
      .pipe(
        takeUntilDestroyed(),
        this.notify.notifyError('Помилка завантаження інформації про ресторан')
      )
      .subscribe(restaurant => {
        this.$restaurant.set(restaurant);
      });
  }

  private loadClient(order: Order) {
    if (order.clientUserId != undefined) {
      this.clientsApi.getClientByUserId(order.clientUserId)
        .pipe(
          takeUntilDestroyed(),
          this.notify.notifyError('Помилка завантаження інформації про клієнта')
        )
        .subscribe(client => {
          this.$client.set(mapClientToStoreEntity(client));
        });
    }
  }

  private loadEmployee(order: Order) {
    if (order.employeeUserId != undefined) {
      this.employeeApi.getEmployeeByUserId(order.employeeUserId)
        .pipe(
          takeUntilDestroyed(),
          this.notify.notifyError('Помилка завантаження інформації про працівника')
        )
        .subscribe(employee => {
          this.$employee.set(mapEmployeeToStoreEntity(employee));
        });
    }
  }

  protected onComplete() {
    this.ordersApi.completeOrder(this.$order().id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        this.notify.notifyHttpRequest()
      )
      .subscribe(() => {
        this.$order().isCompleted = true;
      });
  }

  protected readonly UserRole = UserRole;
}
