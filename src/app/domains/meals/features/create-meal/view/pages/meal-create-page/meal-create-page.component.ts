import {Component, inject} from '@angular/core';
import {Location} from "@angular/common";
import {MealControllerService} from "../../../../../../../api/api/mealController.service";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {
  CreateMealWithImage,
  MealUpsertFormComponent
} from "../../components/meal-upsert-form/meal-upsert-form.component";
import {ImageService} from "../../../../../../../shared/features/images/data-access/services/image.service";
import {switchMap} from "rxjs";
import {ImageType} from "../../../../../../../api/model/imageType";

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
  private readonly imageService = inject(ImageService);

  protected onSubmit(dto: CreateMealWithImage) {
    const {createMeal, image} = dto;
    this.api.createMeal(createMeal)
      .pipe(
        this.notify.notifyHttpRequest(),
        switchMap(() => {
          return this.imageService.uploadNewImage$(ImageType.MEAL_IMAGE, createMeal.title, image);
        })
      )
      .subscribe(() => {
        this.location.back();
      });
  }

  protected onCancel() {
    this.location.back();
  }
}
