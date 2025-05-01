import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {Meal} from "../../../../api/model/meal";
import {inject} from "@angular/core";
import {MealControllerService} from "../../../../api/api/mealController.service";
import {catchError, EMPTY, map, switchMap} from "rxjs";
import {ClientMealControllerService} from "../../../../api/api/clientMealController.service";
import {HttpErrorResponse} from "@angular/common/http";

export const CLIENT_MEAL_RESOLVER_KEY = "CLIENT_MEAL_RESOLVER_KEY";

export const clientMealResolver: ResolveFn<Meal> = (route, state) => {
  const router = inject(Router);

  const clientMealId = Number(route.paramMap.get('clientMealId'));
  if (isNaN(clientMealId)) {
    return new RedirectCommand(router.parseUrl('not-found'));
  }

  const clientMealApi = inject(ClientMealControllerService);
  const mealApi = inject(MealControllerService);

  return clientMealApi.getClientMealById(clientMealId)
    .pipe(
      switchMap(clientMeal => {
        return mealApi.getMealById(clientMeal.mealId, false)
          .pipe(
            map(meal => {
              return {
                price: clientMeal.price,
                energeticValue: clientMeal.energeticValue,
                weight: clientMeal.weight,
                additionalPrice: meal.additionalPrice,
                title: meal.title,
                id: meal.id,
                recipe: meal.recipe,
                description: meal.description,
                ingredients: clientMeal.ingredients.map(i => ({
                  ...i,
                  isFixated: true
                })),
              }
            })
          );
      }),
      catchError(err => {
        if(err instanceof HttpErrorResponse && err.status === 403) {
          router.navigate(['forbidden']);
        } else {
          router.navigate(['not-found']);
        }
        return EMPTY;
      }),
    );
};
