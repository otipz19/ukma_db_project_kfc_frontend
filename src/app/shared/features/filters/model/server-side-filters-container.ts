import {ServerSideFilterModel} from "./server-side-filter-model";

export class ServerSideFiltersContainer<TFilterDto> {
  private readonly filterModels: Array<ServerSideFilterModel<TFilterDto>> = [];

  addFilterModel<TModel extends ServerSideFilterModel<TFilterDto>>(model: TModel): TModel {
    this.filterModels.push(model);
    return model;
  }

  getAllFilters(): Partial<TFilterDto> {
    let result: Partial<TFilterDto> = {};
    for (const model of this.filterModels) {
      if(model.hasFilter()) {
        result = {...result, ...model.getFilterDtoPart()};
      }
    }
    return result;
  }

  cleanFilters() {
    for (const model of this.filterModels) {
      model.cleanFilter();
    }
  }
}
