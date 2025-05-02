import {ServerSideFilterModel} from "../model/server-side-filter-model";

export abstract class BaseOptionsFilterModel<TFilterDto, TOption extends string> implements ServerSideFilterModel<TFilterDto> {
  protected abstract optionsValues: Array<TOption>;

  protected abstract optionsMap: Map<TOption, boolean>;

  toggleOption(option: TOption) {
    this.optionsMap.set(option, !this.optionsMap.get(option));
  }

  abstract getFilterDtoPart(): Partial<TFilterDto>;

  hasFilter(): boolean {
    return this.getAllTrue().length > 0;
  }

  cleanFilter(): void {
    for (const option of this.optionsValues) {
      this.optionsMap.set(option, false);
    }
  }

  protected getAllTrue(): Array<TOption> {
    const result: TOption[] = [];
    for (const option of this.optionsValues) {
      if (this.optionsMap.get(option)) {
        result.push(option);
      }
    }
    return result;
  }
}
