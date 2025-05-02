import {
  BaseOptionsFilterModel
} from "../../../../../../shared/features/filters/generic-filters/base-options-filter-model";
import {RestaurantsStatisticFilter} from "../../../../../../api/model/restaurantsStatisticFilter";

export enum RestaurantsStatsDeletedFilterOptions {
  DELETED = "DELETED",
  NO = "NO"
}

export class RestaurantsStatsDeletedFilterModel extends BaseOptionsFilterModel<RestaurantsStatisticFilter, RestaurantsStatsDeletedFilterOptions> {
  protected override optionsValues: RestaurantsStatsDeletedFilterOptions[] = Object.values(RestaurantsStatsDeletedFilterOptions);

  protected override optionsMap: Map<RestaurantsStatsDeletedFilterOptions, boolean> = new Map<RestaurantsStatsDeletedFilterOptions, boolean>([
    [RestaurantsStatsDeletedFilterOptions.DELETED, false],
    [RestaurantsStatsDeletedFilterOptions.NO, false]
  ]);

  override getFilterDtoPart(): Partial<RestaurantsStatisticFilter> {
    const allTrue = this.getAllTrue();
    if(allTrue.length !== 1) {
      return {};
    }
    return {isDeleted: allTrue[0] === RestaurantsStatsDeletedFilterOptions.DELETED};
  }
}
