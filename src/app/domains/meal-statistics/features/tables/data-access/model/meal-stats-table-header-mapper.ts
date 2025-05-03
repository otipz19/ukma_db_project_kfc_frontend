import {MealStatsPageTableColumn} from "./meal-stats-columns";

export const MealStatsTableHeaderMapper: Record<MealStatsPageTableColumn, string> = {
  title: 'Назва',
  clientMealsCount: 'Кількість клієнтських страв',
  lastOrderedDate: 'Дата останнього замовлення',
  isActual: 'Актуальність',
  actions: 'Дії',
} as const;
