export interface ServerSideFilterModel<TFilterDto> {
  getFilterDtoPart(): Partial<TFilterDto>;

  hasFilter(): boolean;

  cleanFilter(): void;
}
