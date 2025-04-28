import {ColumnsMapper, DEFAULT_COLUMNS_MAPPER} from "./columns-mapper";

export function mapEntityToRow<TEntity extends object, TKey extends keyof TEntity>(entity: TEntity, header: Array<TKey>, mapper: ColumnsMapper<TEntity> = DEFAULT_COLUMNS_MAPPER): Array<TEntity[TKey]> {
  const result = [];
  for (const col of header) {
    const val = mapper.map(col, entity[col]);
    result.push(val);
  }
  // @ts-ignore
  return result;
}
