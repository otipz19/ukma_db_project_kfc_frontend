import {inject, Injectable} from "@angular/core";
import {DeleteDialogService} from "../../../../../../shared/features/delete-dialog/services/delete-dialog.service";
import {MealControllerService} from "../../../../../../api/api/mealController.service";
import {NotifyService} from "../../../../../../shared/features/notify/data-access/services/notify.service";
import {MealsStore} from "../../../../data-access/store/meals.store";
import {Meal} from "../../../../../../api/model/meal";
import {switchMap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteMealService {
  private readonly deleteDialog = inject(DeleteDialogService);
  private readonly api = inject(MealControllerService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(MealsStore);

  delete(meal: Meal) {
    this.deleteDialog.confirmDelete$({
      entityTypeName: 'страву',
      entityInstanceName: meal.title
    })
      .pipe(
        switchMap(() => {
          return this.api.deleteMeal(meal.id);
        }),
        this.notify.notifyHttpRequest(),
      )
      .subscribe(() => {
        this.store.remove(meal.id);
      });
  }
}
