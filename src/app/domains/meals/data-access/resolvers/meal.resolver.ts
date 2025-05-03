import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {Meal} from "../../../../api/model/meal";
import {inject} from "@angular/core";
import {MealControllerService} from "../../../../api/api/mealController.service";
import {catchError, EMPTY} from "rxjs";

export const MEAL_RESOLVER_KEY = "MEAL_RESOLVER_KEY";

export const mealResolver: ResolveFn<Meal> = (route, state) => {
  const router = inject(Router);

  const mealId = Number(route.paramMap.get('mealId'));
  if (isNaN(mealId)) {
    return new RedirectCommand(router.parseUrl('not-found'));
  }

  const mealApi = inject(MealControllerService);

  return mealApi.getMealById(mealId, false)
    .pipe(
      catchError(() => {
        router.navigate(['not-found']);
        return EMPTY;
      }),
    );
};

