import {ServerSideFilterModel} from "../../../../../../shared/features/filters/model/server-side-filter-model";
import {MealsStatisticFilter} from "../../../../../../api/model/mealsStatisticFilter";

export enum MealStatus {
  ACTUAL = "ACTUAL",
  NOT_ACTUAL = "NOT_ACTUAL"
}

export class MealStatsStatusFilterModel implements ServerSideFilterModel<MealsStatisticFilter> {
  private optionsValues = Object.values(MealStatus);

  private optionsMap = new Map<MealStatus, boolean>([
    [MealStatus.ACTUAL, true],
    [MealStatus.NOT_ACTUAL, false],
  ]);

  isOptionEnabled(option: MealStatus) {
    return this.optionsMap.get(option);
  }

  toggleOption(option: MealStatus) {
    this.optionsMap.set(option, !this.optionsMap.get(option));
    for (const opt of this.optionsValues) {
      if (opt !== option) {
        this.optionsMap.set(opt, false);
      }
    }
  }

  getFilterDtoPart(): Partial<MealsStatisticFilter> {
    const allTrue = this.getAllTrue();
    if(allTrue.length !== 1) {
      return {};
    }
    return {isActual: allTrue[0] === MealStatus.ACTUAL};
  }

  hasFilter(): boolean {
    return this.getAllTrue().length > 0;
  }

  cleanFilter(): void {
    this.optionsMap.set(MealStatus.ACTUAL, true);
    this.optionsMap.set(MealStatus.NOT_ACTUAL, false);
  }

  private getAllTrue(): Array<MealStatus> {
    const result: MealStatus[] = [];
    for (const position of this.optionsValues) {
      if (this.optionsMap.get(position)) {
        result.push(position);
      }
    }
    return result;
  }
}
