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
import {IngredientDeleteDialogComponent} from "../ingredient-delete-dialog/ingredient-delete-dialog.component";
import {IngredientEditDialogComponent} from "../ingredient-edit-dialog/ingredient-edit-dialog.component";

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
  private readonly dialog = inject(MatDialog);

  readonly $ingredient = input.required<IngredientDto>({alias: 'ingredient'});

  onDeleteClick(): void {
    const dialogRef = this.dialog.open(IngredientDeleteDialogComponent, {
      data: {title: this.$ingredient().title}
    });

    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (isConfirmed) {
        // TODO: Add backend logic here
      }
    });
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
