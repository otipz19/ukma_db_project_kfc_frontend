import {OrderMealIngredient} from "./order-meal-ingredient";

export interface OrderMeal {
  id: number;
  title: string;
  additionalPrice: number;
  energeticValue: number;
  weight: number;
  price: number;
  amount: number;
  ingredients: Array<OrderMealIngredient>;
}
