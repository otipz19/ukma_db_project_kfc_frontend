import {Component, inject} from '@angular/core';
import {Location} from "@angular/common";
import {UpdateMeal} from "../../../../../../../api/model/updateMeal";
import {MealControllerService} from "../../../../../../../api/api/mealController.service";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {MealUpsertFormComponent} from "../../components/meal-upsert-form/meal-upsert-form.component";

@Component({
  selector: 'app-meal-create-page',
  imports: [
    MealUpsertFormComponent
  ],
  templateUrl: './meal-create-page.component.html',
  styleUrl: './meal-create-page.component.scss'
})
export class MealCreatePageComponent {
  private readonly api = inject(MealControllerService);
  private readonly notify = inject(NotifyService);
  private readonly location = inject(Location);

  protected onSubmit(dto: UpdateMeal) {
    this.api.createMeal(dto)
      .pipe(
        this.notify.notifyHttpRequest()
      )
      .subscribe(() => {
        this.location.back();
      });
  }

  protected onCancel() {
    this.location.back();
  }
}
