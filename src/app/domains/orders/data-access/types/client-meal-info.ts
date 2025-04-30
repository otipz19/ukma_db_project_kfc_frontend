import {Meal} from "../../../../api/model/meal";
import {ClientMeal} from "../../../../api/model/clientMeal";

export type ClientMealInfo = Omit<Meal & ClientMeal, 'mealId' | 'ingredients' | 'recipe' | 'description'>;
