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
import {MatDialog} from "@angular/material/dialog";
import {IngredientEditDialogComponent} from "../ingredient-edit-dialog/ingredient-edit-dialog.component";
import {DeleteIngredientService} from "../../../features/delete-ingredient/services/delete-ingredient.service";

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

  private readonly dialog = inject(MatDialog);

  readonly $ingredient = input.required<IngredientDto>({alias: 'ingredient'});

  onDeleteClick(): void {
    this.deleteIngredientService.delete(this.$ingredient());
  }

  onEditClick(): void {
    const dialogRef = this.dialog.open(IngredientEditDialogComponent, {
      data: this.$ingredient(),
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(updatedIngredient => {
      if (updatedIngredient) {
        // TODO: Add backend logic here
      }
    });
  }
}
