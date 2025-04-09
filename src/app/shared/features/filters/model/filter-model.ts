export interface FilterModel<TEntity> {
  shouldPassFilter(entity: TEntity): boolean;
}
