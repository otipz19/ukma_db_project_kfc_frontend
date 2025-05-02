import {inject, Injectable} from "@angular/core";
import {UpsertDialogService} from "../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {
  IngredientUpsertFormComponent
} from "../../../view/components/ingredient-upsert-form/ingredient-upsert-form.component";
import {Ingredient} from "../../../../../api/model/ingredient";
import {IngredientControllerService} from "../../../../../api/api/ingredientController.service";
import {NotifyService} from "../../../../../shared/features/notify/data-access/services/notify.service";
import {IngredientsStore} from "../../../data-access/store/ingredients.store";
import {switchMap, tap} from "rxjs";
import {ImageService} from "../../../../../shared/features/images/data-access/services/image.service";
import {ImageType} from "../../../../../api/model/imageType";

@Injectable({
  providedIn: 'root'
})
export class EditIngredientService {
  private readonly api = inject(IngredientControllerService);
  private readonly upsertDialogService = inject(UpsertDialogService);
  private readonly notify = inject(NotifyService);
  private readonly store = inject(IngredientsStore);
  private readonly imageService = inject(ImageService);

  edit(initialIngredient: Ingredient, initialImage: File | undefined) {
    const {id, ...createIngredientInit} = initialIngredient;

    this.upsertDialogService.openUpsert$({
      title: 'Редагування інгредієнта',
      formComponent: IngredientUpsertFormComponent,
      initialValue: {image: initialImage, ingredient: createIngredientInit},
      submitCallback: updatedIngredientWithImage => {
        const {image, ingredient: updatedIngredient} = updatedIngredientWithImage;
        const {title, ...rest} = updatedIngredient;
        return this.api.updateIngredient(id, rest)
          .pipe(
            this.notify.notifyHttpRequest(),
            tap(updatedId => {
              this.store.update(id, updatedId);
            }),
            switchMap(() => {
              return this.imageService.changeImage$(ImageType.INGREDIENT_IMAGE, updatedIngredient.title, image);
            }),
            tap(() => {
              this.store.loadAll();
            })
          )
      }
    });
  }
}
