import {ServerSideFilterModel} from "../model/server-side-filter-model";
import {Ingredient} from "../../../../api/model/ingredient";

export abstract class ExcludeFilterModel<TEntity extends {id: number}, TFilterDto extends {idsNot?: number[]}> implements ServerSideFilterModel<TFilterDto> {
  private excludeIds: Array<Ingredient['id']> = [];

  exclude(id: TEntity['id']) {
    this.excludeIds.push(id);
  }

  include(id: TEntity['id']) {
    this.excludeIds = this.excludeIds.filter(i => i !== id);
  }

  getFilterDtoPart(): Partial<TFilterDto> {
    if (!this.hasFilter()) {
      return {};
    }
    return {idsNot: [...this.excludeIds]} as Partial<TFilterDto>;
  }

  hasFilter(): boolean {
    return this.excludeIds.length !== 0;
  }

  cleanFilter(): void {
    this.excludeIds = [];
  }
}
