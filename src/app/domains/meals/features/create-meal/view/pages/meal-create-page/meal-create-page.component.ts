import {Component, inject} from '@angular/core';
import {MealCreateFormComponent} from "../../components/meal-create-form/meal-create-form.component";
import {Location} from "@angular/common";
import {UpdateMeal} from "../../../../../../../api/model/updateMeal";
import {MealControllerService} from "../../../../../../../api/api/mealController.service";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {MealsStore} from "../../../../../data-access/store/meals.store";

@Component({
  selector: 'app-meal-create-page',
  imports: [
    MealCreateFormComponent
  ],
  templateUrl: './meal-create-page.component.html',
  styleUrl: './meal-create-page.component.scss'
})
export class MealCreatePageComponent {
  private readonly api = inject(MealControllerService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(MealsStore);
  private readonly location = inject(Location);

  protected onSubmit(dto: UpdateMeal) {
    this.api.createMeal(dto)
      .pipe(
        this.notify.notifyHttpRequest()
      )
      .subscribe(id => {
        this.store.load(id);
        this.location.back();
      });
  }

  protected onCancel() {
    this.location.back();
  }
}
