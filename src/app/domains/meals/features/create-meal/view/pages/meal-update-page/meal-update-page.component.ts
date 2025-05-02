import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {
  CreateMealWithImage,
  MealUpsertFormComponent
} from "../../components/meal-upsert-form/meal-upsert-form.component";
import {ActivatedRoute} from "@angular/router";
import {Meal} from "../../../../../../../api/model/meal";
import {MEAL_RESOLVER_KEY} from "../../../../../data-access/resolvers/meal.resolver";
import {MealControllerService} from "../../../../../../../api/api/mealController.service";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {Location} from "@angular/common";
import {ImageService} from "../../../../../../../shared/features/images/data-access/services/image.service";
import {switchMap} from "rxjs";
import {ImageType} from "../../../../../../../api/model/imageType";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-meal-update-page',
  imports: [
    MealUpsertFormComponent
  ],
  templateUrl: './meal-update-page.component.html',
  styleUrl: './meal-update-page.component.scss'
})
export class MealUpdatePageComponent implements OnInit {
  private readonly api = inject(MealControllerService);
  private readonly notify = inject(NotifyService);
  private readonly location = inject(Location);
  private readonly imageService = inject(ImageService);
  private readonly destroyRef = inject(DestroyRef);

  private readonly route = inject(ActivatedRoute);
  protected readonly $meal = signal<Meal>(this.route.snapshot.data[MEAL_RESOLVER_KEY]);
  protected readonly $image = signal<File | undefined>(undefined);

  ngOnInit() {
    this.imageService.getImage$(ImageType.MEAL_IMAGE, this.$meal().title)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(image => {
        this.$image.set(image);
      });
  }

  protected onSubmit(dto: CreateMealWithImage) {
    const {createMeal, image} = dto;
    const {title, ...updateMeal} = createMeal;
    this.api.updateMeal(this.$meal().id, updateMeal)
      .pipe(
        this.notify.notifyHttpRequest(),
        switchMap(() => {
          return this.imageService.changeImage$(ImageType.MEAL_IMAGE, createMeal.title, image);
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
