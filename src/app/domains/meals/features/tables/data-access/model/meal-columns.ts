import {Meal} from "../../../../../../api/model/meal";

export type MealColumn = (keyof Omit<Meal, 'id' | 'recipe' | 'description' | 'ingredients'>);

export const MealColumns: Record<MealColumn, MealColumn> = {
  title: 'title',
  additionalPrice: 'additionalPrice',
  price: 'price',
  energeticValue: 'energeticValue',
  weight: 'weight',
};
