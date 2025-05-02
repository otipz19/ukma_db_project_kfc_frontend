import {
  ColumnMapperFn,
  ColumnsMapper
} from "../../../../../../shared/features/reports/data-access/model/columns-mapper";
import {RestaurantStatistic} from "../../../../../../api/model/restaurantStatistic";

export class RestaurantStatsColumnsMapper extends ColumnsMapper<RestaurantStatistic> {
  protected override readonly mappers = new Map<keyof RestaurantStatistic, ColumnMapperFn<RestaurantStatistic>>([]);
}
