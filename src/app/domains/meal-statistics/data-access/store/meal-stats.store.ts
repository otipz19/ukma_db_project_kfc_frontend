import {BaseStatsStore} from "../../../../shared/store/base-stats-store";
import {map, Observable} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {MealStatistic} from "../../../../api/model/mealStatistic";
import {MealsStatisticFilter} from "../../../../api/model/mealsStatisticFilter";
import {MealStatsFiltersContainer} from "../../features/filters/data-access/model/meal-stats.filters-container";
import {MealControllerService} from "../../../../api/api/mealController.service";
import {convertUnixTimestampToDateString} from "../../../../shared/utils/convert-unix-timestamp-to-date-string";

@Injectable({
  providedIn: 'root'
})
export class MealStatsStore extends BaseStatsStore<MealStatistic, MealsStatisticFilter, MealStatsFiltersContainer> {
  private api = inject(MealControllerService);

  protected override buildFiltersContainer(): MealStatsFiltersContainer {
    return new MealStatsFiltersContainer();
  }

  protected override getAllFromApi(filterDto: Partial<MealsStatisticFilter>): Observable<MealStatistic[]> {
    return this.api.getMealsStatisticByFilter({...filterDto})
      .pipe(
        map(list => {
          this.setTotalItems(list.total);
          for(const meal of list.items) {
            if(meal.lastOrderedDate) {
              meal.lastOrderedDate = convertUnixTimestampToDateString(meal.lastOrderedDate);
            }
          }
          return list.items;
        })
      );
  }
}
