import {Component, computed, DestroyRef, inject, input, OnInit, output, signal} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {MatIconButton} from "@angular/material/button";
import {MealIngredientFullData} from "../../../data-access/types/meal-ingredient-full-data";
import {Ingredient} from "../../../../../../../api/model/ingredient";
import {MealIngredientsService} from "../../../data-access/services/meal-ingredients.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-meal-ingredient-card',
  imports: [
    MatCard,
    MatIconButton
  ],
  templateUrl: './meal-ingredient-card.component.html',
  styleUrl: './meal-ingredient-card.component.scss'
})
export class MealIngredientCardComponent implements OnInit {
  private readonly ingredientsService = inject(MealIngredientsService);
  private readonly destroyRef = inject(DestroyRef);

  readonly $id = input.required<Ingredient['id']>({alias: 'id'});
  protected readonly $fullData = signal<MealIngredientFullData | undefined>(undefined);

  ngOnInit() {
    this.ingredientsService.getDataById(this.$id())
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(data => {
        this.$fullData.set(data);
      });
  }

  increase() {
    this.amountChange.emit(this.$amount() + 1);
  }

  decrease() {
    if (this.$amount() > 0) {
      this.amountChange.emit(this.$amount() - 1);
    }
  }
}
