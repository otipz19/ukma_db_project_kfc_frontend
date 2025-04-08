import {Component, inject, input} from '@angular/core';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {IngredientDto} from "../../../model/ingredient-dto";
import {MatIcon} from "@angular/material/icon";
import {DeleteIngredientService} from "../../../features/delete-ingredient/services/delete-ingredient.service";
import {EditIngredientService} from "../../../features/edit-ingredient/services/edit-ingredient.service";

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
    MatIcon
  ],
  templateUrl: './ingredient-card.component.html',
  styleUrl: './ingredient-card.component.scss'
})
export class IngredientCardComponent {
  private readonly deleteIngredientService = inject(DeleteIngredientService);
  private readonly editIngredientService = inject(EditIngredientService);

  readonly $ingredient = input.required<IngredientDto>({alias: 'ingredient'});

  onDeleteClick(): void {
    this.deleteIngredientService.delete(this.$ingredient());
  }

  onEditClick(): void {
    this.editIngredientService.edit(this.$ingredient());
  }
}
