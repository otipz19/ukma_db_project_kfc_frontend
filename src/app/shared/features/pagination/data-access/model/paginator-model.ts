import {PageEvent} from "@angular/material/paginator";

export type StorePage = {
  page: number,
  size: number
};

export const PAGE_SIZE_OPTIONS = [8, 16, 24] as const;

export class PaginatorModel {
  private _total?: number;
  private readonly _storePage: StorePage = {
    page: 0,
    size: PAGE_SIZE_OPTIONS[0],
  };

  set total(total: number) {
    this._total = total;
  }

  get total(): number {
    return this._total ?? 0;
  }

  get pageIndex(): number {
    return this._storePage.page;
  }

  get pageSize(): number {
    return this._storePage.size;
  }

  set pageSize(size: number) {
    this._storePage.size = size;
  }

  set pageIndex(index: number) {
    this._storePage.page = index;
  }

  get storePage(): StorePage {
    return this._storePage;
  }

  setPageEvent(pageEvent: PageEvent) {
    this._storePage.page = pageEvent.pageIndex;
    this._storePage.size = pageEvent.pageSize;
  }
}
