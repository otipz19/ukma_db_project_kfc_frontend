import {PageEvent} from "@angular/material/paginator";
import {computed, Signal} from "@angular/core";

export class PaginationModel<TEntity> {
  readonly pageSizeOptions = [5, 10, 25, 100] as const;

  private pageIndex: number = 0;
  private pageSize: number = this.pageSizeOptions[1];

  onPageEvent(pageEvent: PageEvent) {
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
  }

  $paginationSignal($innerSignal: Signal<Array<TEntity>>): Signal<Array<TEntity>> {
    return computed(() => {
      const startIndex = this.pageIndex * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return $innerSignal().slice(startIndex, endIndex);
    });
  }
}
