import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Meal} from "../../../../../api/model/meal";
import {MEAL_RESOLVER_KEY} from "../../../data-access/resolvers/meal.resolver";
import {MatCard, MatCardImage} from "@angular/material/card";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {IngredientControllerService} from "../../../../../api/api/ingredientController.service";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {MealIngredientCombinedDto} from "../../../data-access/types/meal-ingredient-combined-dto";
import {
  MealIngredientViewCardComponent
} from "../../components/meal-ingredient-view-card/meal-ingredient-view-card.component";
import {CommonDataCardComponent} from "../../../../../shared/components/common-data-card/common-data-card.component";

@Component({
  selector: 'app-view-meal-page',
  imports: [
    MatCard,
    MatCardImage,
    MealIngredientViewCardComponent,
    CommonDataCardComponent
  ],
  templateUrl: './view-meal-page.component.html',
  styleUrl: './view-meal-page.component.scss'
})
export class ViewMealPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly ingredientsApi = inject(IngredientControllerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly notify = inject(NotifyService);

  protected readonly $meal = signal<Meal>(this.route.snapshot.data[MEAL_RESOLVER_KEY]);
  protected readonly $mealIngredients = signal<MealIngredientCombinedDto[]>([]);

   ngOnInit() {
     const mealIngredients = this.$meal().ingredients;
     const ids = mealIngredients.map(i => i.ingredientId);

     this.ingredientsApi.getIngredientsByFilter({ids: ids})
       .pipe(
         takeUntilDestroyed(this.destroyRef),
         this.notify.notifyError()
       )
       .subscribe(ingredients => {
         const dtos: MealIngredientCombinedDto[] = ingredients.items.map(ingredient => {
           const mealIngredient = mealIngredients
             .find(m => m.ingredientId === ingredient.id)!;
           return {ingredient, mealIngredient};
         });
         this.$mealIngredients.set(dtos);
       });
   }
}
