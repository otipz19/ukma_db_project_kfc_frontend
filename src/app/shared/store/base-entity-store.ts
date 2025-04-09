import {signal} from "@angular/core";
import {Ingredient} from "../../api/model/ingredient";
import {FiltersContainer} from "../features/filters/model/filters-container";
import {Observable} from "rxjs";

export abstract class BaseEntityStore<TEntity extends {id: number}, TFiltersContainer extends FiltersContainer<TEntity>> {
  readonly filters: TFiltersContainer = this.buildFiltersContainer();

  private readonly $responseList = signal<Array<TEntity>>([]);
  private readonly $filteredList = this.filters.$filterSignal(this.$responseList);
  readonly $viewList = this.$filteredList;

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

  update(oldId: Ingredient['id'], newId: Ingredient['id']) {
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

  remove(id: Ingredient['id']) {
    this.$responseList.update(oldValue => {
      return oldValue.filter(item => item.id !== id);
    });
  }

  forceSignalReload() {
    this.$responseList.update(val => [...val]);
  }
}
