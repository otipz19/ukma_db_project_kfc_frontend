import {signal} from "@angular/core";
import {FiltersContainer} from "../features/filters/model/filters-container";
import {Observable} from "rxjs";
import {BaseFilter} from "../../api/model/baseFilter";
import {Sort} from "@angular/material/sort";

export type StoreSort = Pick<BaseFilter, 'sortBy' | 'descendingOrder'>;

export abstract class BaseEntityStore<TEntity extends {id: number}, TFiltersContainer extends FiltersContainer<TEntity>> {
  readonly filters: TFiltersContainer = this.buildFiltersContainer();

  private readonly $sort = signal<StoreSort | undefined>(undefined);

  protected readonly $responseList = signal<Array<TEntity>>([]);
  protected readonly $filteredList = this.filters.$filterSignal(this.$responseList);

  protected abstract buildFiltersContainer(): TFiltersContainer;

  sort(sort: Sort) {
    this.$sort.set({
      sortBy: sort.active,
      descendingOrder: sort.direction === 'desc'
    });
  }

  initialLoad() {
    this.cleanFilters();
    this.loadAll();
  }

  loadAll() {
    this.getAllFromApi(this.$sort())
      .subscribe(result => {
        this.$responseList.set(result);
      });
  }

  protected abstract getAllFromApi(sort?: StoreSort): Observable<Array<TEntity>>;

  load(id: number) {
    this.getByIdFromApi(id)
      .subscribe(result => {
        this.$responseList.update(oldVal => [result, ...oldVal]);
      });
  }

  update(oldId: number, newId: number) {
    this.getByIdFromApi(newId)
      .subscribe(result => {
        this.$responseList.update(oldVal => {
          const val = oldVal.filter(item => item.id !== oldId);
          val.push(result);
          return val;
        });
      });
  }

  protected abstract getByIdFromApi(id: number): Observable<TEntity>;

  remove(id: number) {
    this.$responseList.update(oldValue => {
      return oldValue.filter(item => item.id !== id);
    });
  }

  cleanFilters() {
    this.filters.cleanFilters();
    this.forceSignalReload();
  }

  forceSignalReload() {
    this.$responseList.update(val => [...val]);
  }
}
