import {
  buildPageTableColumns,
  PageTableColumn
} from "../../../../../../shared/features/reports/data-access/model/page-table-column";
import {MealStatistic} from "../../../../../../api/model/mealStatistic";

export type MealStatsColumn = keyof Omit<MealStatistic, 'id'>;

export type MealStatsPageTableColumn = PageTableColumn<MealStatsColumn>;

export const MealStatsColumns: Record<MealStatsColumn, MealStatsColumn> = {
  title: 'title',
  clientMealsCount: 'clientMealsCount',
  lastOrderedDate: 'lastOrderedDate',
  isActual: 'isActual'
} as const;

export const MealStatsPageTableColumns = buildPageTableColumns(MealStatsColumns);
