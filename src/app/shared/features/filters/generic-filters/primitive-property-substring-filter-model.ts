import {FilterModel} from "../model/filter-model";

export abstract class PrimitivePropertySubstringFilterModel<TEntity extends object> implements FilterModel<TEntity> {
  private curFilter?: string;

  shouldPassFilter(entity: TEntity): boolean {
    if (!this.curFilter || this.curFilter.trim() === '') {
      return true;
    }
    for (const prop of Object.values(entity)) {
      if(shouldCheck(prop)) {
        if(String(prop).trim().toLowerCase().includes(this.curFilter)) {
          return true;
        }
      }
    }
    return false;
  }

  setFilter(filter: string) {
    this.curFilter = filter.trim().toLowerCase();
  }
}

const CHECKED_PRIMITIVE_TYPES = ['string', 'number'];

function shouldCheck(value: any) {
  return CHECKED_PRIMITIVE_TYPES.includes(typeof value);
}
