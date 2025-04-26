import {Routes} from "@angular/router";
import {hasRoleRouteGuard} from "../../core/route-guards/has-role-route.guard";
import {UserRole} from "../../api";
import {MEAL_RESOLVER_KEY, mealResolver} from "./data-access/resolvers/meal.resolver";

export const MEALS_ROUTES: Routes = [
  {
    path: 'meals',
    canActivate: [hasRoleRouteGuard(UserRole.ADMIN)],
    children: [
      {
        path: '',
        loadComponent: () => import('./view/pages/meals-page/meals-page.component').then(r => r.MealsPageComponent)
      },
      {
        path: 'create',
        loadComponent: () => import('./features/create-meal/view/pages/meal-create-page/meal-create-page.component').then(r => r.MealCreatePageComponent)
      },
      {
        path: ':mealId',
        resolve: {[MEAL_RESOLVER_KEY]: mealResolver},
        children: [
          {
            path: '',
            loadComponent: () => import('./view/pages/view-meal-page/view-meal-page.component').then(r => r.ViewMealPageComponent)
          },
          {
            path: 'update',
            loadComponent: () => import('./features/create-meal/view/pages/meal-update-page/meal-update-page.component').then(r => r.MealUpdatePageComponent)
          }
        ]
      }
    ]
  }
];
