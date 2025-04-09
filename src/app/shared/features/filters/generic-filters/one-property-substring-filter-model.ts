import {FilterModel} from "../model/filter-model";

export abstract class OnePropertySubstringFilterModel<TEntity extends object> implements FilterModel<TEntity> {
  private curFilter?: string;

  shouldPassFilter(entity: TEntity): boolean {
    if(!this.curFilter || this.curFilter.trim() === '') {
      return true;
    }
    return this.getProperty(entity).toLowerCase().includes(this.curFilter);
  }

  protected abstract getProperty(entity: TEntity): string;

  setFilter(filter: string) {
    this.curFilter = filter.trim().toLowerCase();
  }
}
