import {ValuableIngredientsFilter} from "../../../../../../api/model/valuableIngredientsFilter";
import {ToggleableFilterModel} from "../../../../../../shared/features/filters/generic-filters/toggleable-filter-model";

export class IngredientsMinMealPriceFilterModel extends ToggleableFilterModel<ValuableIngredientsFilter> {
  private minMealPrice = 0;

  setMinMealPrice(value: number) {
    this.minMealPrice = value;
  }

  override getFilterDtoPart(): Partial<ValuableIngredientsFilter> {
    return {minMealPrice: this.minMealPrice};
  }

  protected override doHasFilter(): boolean {
    return this.minMealPrice > 0;
  }

  protected override doCleanFilter(): void {
    this.minMealPrice = 0;
  }
}
