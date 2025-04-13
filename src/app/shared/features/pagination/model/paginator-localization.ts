import {MatPaginatorIntl} from "@angular/material/paginator";
import {Provider} from "@angular/core";

export class PaginatorLocalization extends MatPaginatorIntl {
  override itemsPerPageLabel: string = 'Елементів на сторінці';
  override nextPageLabel: string = 'Наступна';
  override previousPageLabel: string = 'Попередня';
  override firstPageLabel: string = 'Перша';
  override lastPageLabel: string = 'Остання';
}

export const paginatorLocalizationProvider: Provider = {provide: MatPaginatorIntl, useClass: PaginatorLocalization};
