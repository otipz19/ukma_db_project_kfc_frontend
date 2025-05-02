import {
  BaseOptionsFilterModel
} from "../../../../../../shared/features/filters/generic-filters/base-options-filter-model";
import {RestaurantsStatisticFilter} from "../../../../../../api/model/restaurantsStatisticFilter";

export enum RestaurantsStatsHasManagerOptions {
  HAS_MANAGER = 'HAS_MANAGER',
  NO = "NO"
}

export class RestaurantsStatsHasManagerFilterModel extends BaseOptionsFilterModel<RestaurantsStatisticFilter, RestaurantsStatsHasManagerOptions> {
  protected override optionsValues: RestaurantsStatsHasManagerOptions[] = Object.values(RestaurantsStatsHasManagerOptions);

  protected override optionsMap: Map<RestaurantsStatsHasManagerOptions, boolean> = new Map<RestaurantsStatsHasManagerOptions, boolean>([
    [RestaurantsStatsHasManagerOptions.HAS_MANAGER, false],
    [RestaurantsStatsHasManagerOptions.NO, false],
  ]);

  override getFilterDtoPart(): Partial<RestaurantsStatisticFilter> {
    const allTrue = this.getAllTrue();
    if (allTrue.length !== 1) {
      return {};
    }
    return {hasManager: allTrue[0] === RestaurantsStatsHasManagerOptions.HAS_MANAGER};
  }
}
