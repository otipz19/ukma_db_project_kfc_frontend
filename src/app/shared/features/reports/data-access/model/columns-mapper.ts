export type ColumnMapperFn<TEntity extends object> = (value: TEntity[keyof TEntity]) => string;

export abstract class ColumnsMapper<TEntity extends object, TKey extends keyof TEntity = keyof TEntity> {
  protected abstract mappers: Map<TKey, ColumnMapperFn<TEntity>>;

  map(key: TKey, value: TEntity[TKey]): string {
    if (value == undefined) {
      return '';
    }
    const mapper = this.mappers.get(key);
    if (mapper) {
      return mapper(value);
    }
    return String(value);
  }
}

export class DefaultColumnsMapper extends ColumnsMapper<any> {
  protected override mappers: Map<any, ColumnMapperFn<any>> = new Map();
}

export const DEFAULT_COLUMNS_MAPPER = new DefaultColumnsMapper();
