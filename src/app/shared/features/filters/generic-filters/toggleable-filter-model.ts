import {ServerSideFilterModel} from "../model/server-side-filter-model";

export abstract class ToggleableFilterModel<TFilterDto> implements ServerSideFilterModel<TFilterDto> {
  private enabled = false;

  abstract getFilterDtoPart(): Partial<TFilterDto>;

  toggleFilter() {
    this.enabled = !this.enabled;
  }

  hasFilter(): boolean {
    if(!this.enabled) {
      return false;
    }
    return this.doHasFilter();
  }

  protected abstract doHasFilter(): boolean;

  abstract cleanFilter(): void;
}
