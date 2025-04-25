import {MealIngredientFullData} from "./meal-ingredient-full-data";

export type MealIngredientsLists = {
  required: Array<MealIngredientFullData>,
  optional: Array<MealIngredientFullData>,
  additional: Array<MealIngredientFullData>
};
