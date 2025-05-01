import {ServerSideFilterModel} from "../model/server-side-filter-model";

export abstract class SearchFilterModel<TFilterDto extends { query?: string }> implements ServerSideFilterModel<TFilterDto> {
  private query?: string;

  setQuery(query: string) {
    this.query = query;
  }

  hasFilter(): boolean {
    return this.query != undefined && this.query.trim() != '';
  }

  getFilterDtoPart(): Partial<TFilterDto> {
    return {query: this.query} as Partial<TFilterDto>;
  }

  cleanFilter(): void {
    this.query = undefined;
  }
}
