import {booleanAttribute, Component, computed, inject, input, signal} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DeleteIngredientService} from "../../../features/delete-ingredient/services/delete-ingredient.service";
import {EditIngredientService} from "../../../features/edit-ingredient/services/edit-ingredient.service";
import {Ingredient} from "../../../../../api/model/ingredient";
import {AuthService} from "../../../../../core/services/auth.service";
import {UserRole} from "../../../../../api";
import {ImageType} from "../../../../../api/model/imageType";
import {ImageLoaderDirective} from "../../../../../shared/features/images/view/directives/image-loader.directive";

@Component({
  selector: 'app-ingredient-card',
  imports: [
    MatCardTitle,
    MatCard,
    MatCardContent,
    MatCardImage,
    MatCardActions,
    MatButton,
    MatCardHeader,
    MatIcon,
    ImageLoaderDirective
  ],
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.scss'
})
export class IngredientCardComponent {
  private readonly deleteIngredientService = inject(DeleteIngredientService);
  private readonly editIngredientService = inject(EditIngredientService);
  private readonly authService = inject(AuthService);

  protected readonly $userRole = this.authService.$role;

  readonly $ingredient = input.required<Ingredient>({alias: 'ingredient'});
  readonly $hideActions = input(false, {transform: booleanAttribute, alias: 'hideActions'});

  protected readonly $shouldShowActions = computed(() => {
    return !this.$hideActions() && this.$userRole() === UserRole.ADMIN;
  });

  protected readonly $image = signal<File | undefined>(undefined);

  onDeleteClick(): void {
    this.deleteIngredientService.delete(this.$ingredient());
  }

  onEditClick(): void {
    this.editIngredientService.edit(this.$ingredient(), this.$image());
  }

  protected readonly ImageType = ImageType;
}
