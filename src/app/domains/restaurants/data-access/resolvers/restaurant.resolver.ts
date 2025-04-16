import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {Restaurant} from "../../../../api/model/restaurant";
import {inject} from "@angular/core";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";
import {catchError, EMPTY, forkJoin, of, switchMap} from "rxjs";
import {AuthService} from "../../../../core/services/auth.service";
import {EmployeeControllerService} from "../../../../api";

export const RESTAURANT_RESOLVER_KEY = "RESTAURANT_RESOLVER_KEY";

export const restaurantResolver: ResolveFn<Restaurant> = (route) => {
  const router = inject(Router);

  const restaurantId = Number(route.paramMap.get('restaurantId'));
  if (isNaN(restaurantId)) {
    return new RedirectCommand(router.parseUrl('not-found'));
  }

  const authService = inject(AuthService);

  const user = authService.$currentUser();
  if(user == undefined) {
    return new RedirectCommand(router.parseUrl('forbidden'));
  }

  const restaurantApi = inject(RestaurantControllerService);
  const employeeApi = inject(EmployeeControllerService);

  return forkJoin({
    restaurant: restaurantApi.getRestaurantById(restaurantId),
    employee: employeeApi.getEmployeeByUserId(user.id)
  })
    .pipe(
      switchMap(({restaurant, employee}) => {
        if (authService.$role() === 'ADMIN') {
          return of(restaurant);
        }

        if(employee.position === 'MANAGER' && employee.restaurantId === restaurant.id) {
          return of(restaurant);
        }

        router.navigate(['forbidden']);
        return EMPTY;
      }),
      catchError(() => {
        router.navigate(['not-found']);
        return EMPTY;
      }),
    );
};
