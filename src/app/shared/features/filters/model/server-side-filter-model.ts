export interface ServerSideFilterModel<TFilterDto> {
  getFilterDtoPart(): Partial<TFilterDto>;

  cleanFilter(): void;
}
