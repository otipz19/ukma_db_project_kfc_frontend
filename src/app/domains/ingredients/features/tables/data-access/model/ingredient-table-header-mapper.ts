import {IngredientColumn} from "./ingredients-columns";

export const IngredientTableHeaderMapper: Record<IngredientColumn, string> = {
  title: 'Назва',
  price: 'Ціна',
  weight: 'Вага',
  energeticValue: 'Енергетична цінність'
} as const;
