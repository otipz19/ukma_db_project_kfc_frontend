import {BaseFilter} from "../../api/model/baseFilter";
import {ServerSideFiltersContainer} from "../features/filters/model/server-side-filters-container";
import {PaginatorModel} from "../features/pagination/data-access/model/paginator-model";
import {signal} from "@angular/core";
import {Sort} from "@angular/material/sort";
import {Observable} from "rxjs";
import {StoreSort} from "./base-entity-store";

export abstract class BaseStatsStore<TEntity, TFilterDto extends BaseFilter, TFiltersContainer extends ServerSideFiltersContainer<TFilterDto>> {
  readonly filters: TFiltersContainer = this.buildFiltersContainer();

  private storeSort: StoreSort = {};
  readonly paginatorModel = new PaginatorModel();

  protected readonly $responseList = signal<Array<TEntity>>([]);
  protected readonly $filteredList = this.$responseList.asReadonly();
  readonly $viewList = this.$filteredList;

  protected abstract buildFiltersContainer(): TFiltersContainer;

  protected setTotalItems(total: number) {
    this.paginatorModel.total = total;
  }

  sort(sort: Sort) {
    this.storeSort = {
      sortBy: sort.active,
      descendingOrder: sort.direction === 'desc'
    };
  }

  initialLoad() {
    this.cleanFilters();
    this.loadAll();
  }

  loadAll() {
    this.getAllFromApi({...this.storeSort, ...this.paginatorModel.storePage, ...this.filters.getAllFilters()})
      .subscribe(result => {
        this.$responseList.set(result);
      });
  }

  protected abstract getAllFromApi(filterDto: Partial<TFilterDto>): Observable<Array<TEntity>>;

  cleanFilters() {
    this.filters.cleanFilters();
    this.loadAll();
  }
}
