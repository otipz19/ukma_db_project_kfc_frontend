import {Injectable} from "@angular/core";
import {Ingredient} from "../../../../../../api/model/ingredient";
import {BehaviorSubject, map, Observable} from "rxjs";
import {MealIngredientFullData} from "../types/meal-ingredient-full-data";
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

export enum MealIngredientType {
  REQUIRED = 'MEAL_INGREDIENTS_LIST_REQUIRED', // isFixated = true, amount > 0
  OPTIONAL = 'MEAL_INGREDIENTS_LIST_OPTIONAL', // isFixated = false, amount > 0
  ADDITIONAL = 'MEAL_INGREDIENTS_LIST_ADDITIONAL' // isFixated = false, amount = 0
}

@Injectable({
  providedIn: 'root'
})
export class MealIngredientsService {
  private readonly typeToIds = new Map<MealIngredientType, Array<Ingredient['id']>>();
  private readonly idToData = new Map<Ingredient['id'], MealIngredientFullData>();

  private readonly typeToIdsSubject$ = new BehaviorSubject(this.typeToIds);
  private readonly idToDataSubject$ = new BehaviorSubject(this.idToData);

  getIdListByType$(type: MealIngredientType): Observable<Array<Ingredient['id']>> {
    return this.typeToIdsSubject$
      .pipe(
        map(map => {
          return map.get(type) ?? [];
        })
      );
  }

  getDataById(id: Ingredient['id']): Observable<MealIngredientFullData> {
    return this.idToDataSubject$
      .pipe(
        map(map => {
          return map.get(id)!;
        })
      );
  }

  reset() {
    this.typeToIds.clear();
    for (const type of Object.values(MealIngredientType)) {
      this.typeToIds.set(type, []);
    }
    this.idToData.clear();
  }

  addNew(ingredient: Ingredient) {
    const fullData: MealIngredientFullData = {
      ingredient: ingredient,
      mealIngredient: {
        ingredientId: ingredient.id,
        isFixated: false,
        amount: 1
      }
    };

    this.idToData.set(fullData.ingredient.id, fullData);
    this.addToList(MealIngredientType.OPTIONAL, fullData);
    this.propagateUpdate();
  }

  onDrop(event: CdkDragDrop<Array<Ingredient['id']>>) {
    if (event.previousContainer === event.container) {
      const list = this.getIdListByContainer(event.container);
      moveItemInArray(list, event.previousIndex, event.currentIndex);
      this.propagateUpdate();
    } else {
      const prevList = this.getIdListByContainer(event.previousContainer);
      const curList = this.getIdListByContainer(event.container);
      transferArrayItem(
        prevList,
        curList,
        event.previousIndex,
        event.currentIndex
      );
      this.propagateUpdate();
    }
  }

  private getIdListByContainer(container: CdkDropList<Ingredient['id'][]>): number[] {
    return this.typeToIds.get(container.id as MealIngredientType)!;
  }

  private addToList(listType: MealIngredientType, fullData: MealIngredientFullData) {
    this.typeToIds.get(listType)!.push(fullData.ingredient.id);
  }

  private removeFromList(listType: MealIngredientType, toDeleteId: Ingredient['id']) {
    let list = this.typeToIds.get(listType)!;
    list = list.filter(id => id !== toDeleteId);
    this.typeToIds.set(listType, list);
  }

  private propagateUpdate() {
    this.typeToIdsSubject$.next(this.typeToIds);
    this.idToDataSubject$.next(this.idToData);
  }
}
