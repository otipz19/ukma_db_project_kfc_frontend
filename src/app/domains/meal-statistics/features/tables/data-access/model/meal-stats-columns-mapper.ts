import {
  ColumnMapperFn,
  ColumnsMapper
} from "../../../../../../shared/features/reports/data-access/model/columns-mapper";
import {MealStatistic} from "../../../../../../api/model/mealStatistic";
import {mapMealStatsActual} from "../../../../view/pipes/meals-stats-actual.pipe";

export class MealStatsColumnsMapper extends ColumnsMapper<MealStatistic> {
  protected override readonly mappers = new Map<keyof MealStatistic, ColumnMapperFn<MealStatistic>>([
    ['isActual', (value) => mapMealStatsActual(value as boolean)]
  ]);
}
