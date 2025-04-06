import {Component, inject, signal} from '@angular/core';
import {IngredientCardComponent} from "../../components/ingredient-card/ingredient-card.component";
import {INGREDIENTS} from "../../../model/mock-data";
import {SearchBarComponent} from "../../components/search-bar/search-bar.component";
import {MatDialog} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {
  IngredientCreateDialogComponent
} from "../../components/ingredient-create-dialog/ingredient-create-dialog.component";

@Component({
  selector: 'app-ingredient-list',
  imports: [
    IngredientCardComponent,
    SearchBarComponent,
    MatButton,
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {
  private readonly dialog = inject(MatDialog);

  protected readonly $ingredients = signal(INGREDIENTS);

  protected onSearch(query: string) {
    const filtered = INGREDIENTS.filter(ingredient => ingredient.title.toLowerCase().includes(query));
    this.$ingredients.set(filtered);
  }

  onCreateClick(): void {
    const dialogRef = this.dialog.open(IngredientCreateDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(dto => {
      if (dto) {
        // TODO: Add backend logic here
      }
    });
  }
}
