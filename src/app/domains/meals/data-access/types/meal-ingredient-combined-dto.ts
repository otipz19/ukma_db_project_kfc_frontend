import {Ingredient} from "../../../../api/model/ingredient";
import {MealIngredient} from "../../../../api/model/mealIngredient";

export type MealIngredientCombinedDto = {
  ingredient: Ingredient,
  mealIngredient: MealIngredient
};
