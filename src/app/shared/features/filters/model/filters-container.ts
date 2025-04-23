import {FilterModel} from "./filter-model";
import {computed, Signal} from "@angular/core";

export abstract class FiltersContainer<TEntity> {
  private readonly filterModels: Array<FilterModel<TEntity>> = [];

  addFilterModel<TModel extends FilterModel<TEntity>>(filterModel: TModel): TModel {
    this.filterModels.push(filterModel);
    return filterModel;
  }

  $filterSignal(inputListSignal: Signal<Array<TEntity>>): Signal<Array<TEntity>> {
    return computed(() => {
      const items = inputListSignal();
      return items.filter(item => {
        for(const filterModel of this.filterModels) {
          if(!filterModel.shouldPassFilter(item)) {
            return false;
          }
        }
        return true;
      });
    });
  }

  cleanFilters() {
    for(const model of this.filterModels) {
      model.cleanFilter();
    }
  }
}
