export type PageTableColumn<T extends string> = T | 'actions';

export function buildPageTableColumns<T extends string>(columns: Record<T, T>): Record<PageTableColumn<T>, PageTableColumn<T>> {
  return {
    ...columns,
    actions: 'actions'
  };
}
