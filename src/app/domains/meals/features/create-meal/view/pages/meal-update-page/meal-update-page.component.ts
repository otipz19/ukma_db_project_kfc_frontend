import {Component, inject, signal} from '@angular/core';
import {MealUpsertFormComponent} from "../../components/meal-upsert-form/meal-upsert-form.component";
import {ActivatedRoute} from "@angular/router";
import {Meal} from "../../../../../../../api/model/meal";
import {MEAL_RESOLVER_KEY} from "../../../../../data-access/resolvers/meal.resolver";
import {MealControllerService} from "../../../../../../../api/api/mealController.service";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {Location} from "@angular/common";
import {CreateMeal} from "../../../../../../../api/model/createMeal";

@Component({
  selector: 'app-meal-update-page',
  imports: [
    MealUpsertFormComponent
  ],
  templateUrl: './meal-update-page.component.html',
  styleUrl: './meal-update-page.component.scss'
})
export class MealUpdatePageComponent {
  private readonly api = inject(MealControllerService);
  private readonly notify = inject(NotifyService);
  private readonly location = inject(Location);

  private readonly route = inject(ActivatedRoute);
  protected readonly $meal = signal<Meal>(this.route.snapshot.data[MEAL_RESOLVER_KEY]);

  protected onSubmit(dto: CreateMeal) {
    const {title, ...rest} = dto;
    this.api.updateMeal(this.$meal().id, rest)
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
