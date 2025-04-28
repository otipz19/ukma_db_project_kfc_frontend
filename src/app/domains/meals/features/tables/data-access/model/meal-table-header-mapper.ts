import {MealColumn} from "./meal-columns";

export const MealTableHeaderMapper: Record<MealColumn, string> = {
  title: 'Назва',
  additionalPrice: 'Додана вартість',
  price: 'Ціна',
  weight: 'Вага',
  energeticValue: 'Енергетична цінність'
} as const;
