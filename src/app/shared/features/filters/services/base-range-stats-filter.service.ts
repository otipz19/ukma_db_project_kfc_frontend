import {of} from "rxjs";
import {inject} from "@angular/core";
import {UpsertDialogService} from "../../upsert-dialog/services/upsert-dialog.service";
import {BaseStatsStore} from "../../../store/base-stats-store";
import {BaseFilter} from "../../../../api/model/baseFilter";
import {ServerSideFiltersContainer} from "../model/server-side-filters-container";
import {RangeFilterModel} from "../generic-filters/range-filter-model";
import {UpsertDialogFormComponent} from "../../upsert-dialog/components/upsert-dialog/upsert-dialog.component";
import {ConstructorOfType} from "../../../type-utils/constructor-of-type";

export abstract class BaseRangeStatsFilterService<TEntity, TFilterDto extends BaseFilter, TFiltersContainer extends ServerSideFiltersContainer<TFilterDto>, TStore extends BaseStatsStore<TEntity, TFilterDto, TFiltersContainer>> {
  protected readonly upsertDialog = inject(UpsertDialogService);
  protected abstract readonly store: TStore;

  protected openRangeForm<TPartialFilterDto extends Partial<TFilterDto>, TFormComponent extends ConstructorOfType<UpsertDialogFormComponent<TPartialFilterDto>>>(config: {
    title: string,
    filter: RangeFilterModel<TFilterDto, TPartialFilterDto>,
    formComponent: TFormComponent
  }) {
    this.upsertDialog.openUpsert$(
      {
        title: config.title,
        formComponent: config.formComponent,
        initialValue: config.filter.getRange(),
        submitCallback: (range) => {
          config.filter.setRange(range);
          this.store.loadAll();
          return of(true);
        }
      }
    )
      .subscribe();
  }
}
