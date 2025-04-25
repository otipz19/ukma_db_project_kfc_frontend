import {Component, inject} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";
import {MealIngredientFullData} from "../../../data-access/types/meal-ingredient-full-data";
import {MealIngredientCardComponent} from "../meal-ingredient-card/meal-ingredient-card.component";
import {MealIngredientsService, MealIngredientType} from "../../../data-access/services/meal-ingredients.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {Ingredient} from "../../../../../../../api/model/ingredient";

@Component({
  selector: 'app-meal-ingredients-lists',
  imports: [
    CdkDropListGroup,
    CdkDropList,
    MealIngredientCardComponent,
    CdkDrag
  ],
  templateUrl: './meal-ingredients-lists.component.html',
  styleUrl: './meal-ingredients-lists.component.scss'
})
export class MealIngredientsListsComponent {
  private readonly ingredientsService = inject(MealIngredientsService);

  protected readonly $requiredList = this.$getListSignal(MealIngredientType.REQUIRED);
  protected readonly $optionalList = this.$getListSignal(MealIngredientType.OPTIONAL);
  protected readonly $additionalList = this.$getListSignal(MealIngredientType.ADDITIONAL);

  private $getListSignal(type: MealIngredientType) {
    return toSignal(this.ingredientsService.getIdListByType$(type), {initialValue: []});
  }

  protected onDrop(event: CdkDragDrop<Array<Ingredient['id']>>) {
    this.ingredientsService.onDrop(event);
  }

  protected readonly MealIngredientType = MealIngredientType;
}
