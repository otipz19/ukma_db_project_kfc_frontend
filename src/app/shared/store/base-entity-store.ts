import {signal} from "@angular/core";
import {FiltersContainer} from "../features/filters/model/filters-container";
import {Observable} from "rxjs";

export abstract class BaseEntityStore<TEntity extends {id: number}, TFiltersContainer extends FiltersContainer<TEntity>> {
  readonly filters: TFiltersContainer = this.buildFiltersContainer();

  protected readonly $responseList = signal<Array<TEntity>>([]);
  protected readonly $filteredList = this.filters.$filterSignal(this.$responseList);

  protected abstract buildFiltersContainer(): TFiltersContainer;

  loadAll() {
    this.getAllFromApi()
      .subscribe(result => {
        this.$responseList.set(result);
      });
  }

  protected abstract getAllFromApi(): Observable<Array<TEntity>>;

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

  forceSignalReload() {
    this.$responseList.update(val => [...val]);
  }
}
