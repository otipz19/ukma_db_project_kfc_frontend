import {ValuableIngredientsFilter} from "../../../../../../api/model/valuableIngredientsFilter";
import {ToggleableFilterModel} from "../../../../../../shared/features/filters/generic-filters/toggleable-filter-model";

export type IngredientsMinMealPriceFilterDto = Pick<ValuableIngredientsFilter, 'minMealPrice'>;

export class IngredientsMinMealPriceFilterModel extends ToggleableFilterModel<ValuableIngredientsFilter> {
  private minMealPrice = 0;

  setMinMealPrice(value: IngredientsMinMealPriceFilterDto) {
    this.minMealPrice = value.minMealPrice;
  }

  getMinMealPrice(): IngredientsMinMealPriceFilterDto {
    return {minMealPrice: this.minMealPrice};
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
