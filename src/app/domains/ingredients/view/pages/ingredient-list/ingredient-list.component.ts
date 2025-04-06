import { Component } from '@angular/core';
import {IngredientDto} from "../../../model/ingredient-dto";
import {IngredientCardComponent} from "../../components/ingredient-card/ingredient-card.component";

@Component({
  selector: 'app-ingredient-list',
  imports: [
    IngredientCardComponent
  ],
  templateUrl: './ingredient-list.component.html',
  styleUrl: './ingredient-list.component.scss'
})
export class IngredientListComponent {
  protected readonly ingredients: readonly IngredientDto[] = [
    {
      id: 1,
      image: 'https://placehold.co/1200x800.png?text=Ingredient+Placeholder',
      title: 'Tomato',
      energy: 18,
      weight: 150,
      price: 0.5
    },
    {
      id: 2,
      image: 'https://placehold.co/1200x800.png?text=Ingredient+Placeholder',
      title: 'Cheese',
      energy: 402,
      weight: 100,
      price: 1.2
    },
    {
      id: 3,
      image: 'https://placehold.co/1200x800.png?text=Ingredient+Placeholder',
      title: 'Lettuce',
      energy: 15,
      weight: 80,
      price: 0.3
    },
    {
      id: 4,
      image: 'https://placehold.co/1200x800.png?text=Ingredient+Placeholder',
      title: 'Beef',
      energy: 250,
      weight: 200,
      price: 3.0
    },
    {
      id: 5,
      image: 'https://placehold.co/1200x800.png?text=Ingredient+Placeholder',
      title: 'Onion',
      energy: 40,
      weight: 100,
      price: 0.4
    },
    {
      id: 6,
      image: 'https://placehold.co/1200x800.png?text=Ingredient+Placeholder',
      title: 'Burger Bun',
      energy: 290,
      weight: 90,
      price: 0.6
    }
  ];
}
