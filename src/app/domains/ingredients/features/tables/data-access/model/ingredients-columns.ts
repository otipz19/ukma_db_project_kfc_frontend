import {Ingredient} from "../../../../../../api/model/ingredient";

export type IngredientColumn = (keyof Omit<Ingredient, 'id'>);

export const IngredientsColumns: Record<IngredientColumn, IngredientColumn> = {
  title: 'title',
  price: 'price',
  energeticValue: 'energeticValue',
  weight: 'weight'
};
