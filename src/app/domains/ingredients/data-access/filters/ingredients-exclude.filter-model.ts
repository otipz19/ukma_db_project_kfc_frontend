import {IngredientsFilter} from "../../../../api/model/ingredientsFilter";
import {Ingredient} from "../../../../api/model/ingredient";
import {ExcludeFilterModel} from "../../../../shared/features/filters/generic-filters/exclude-filter-model";

export class IngredientsExcludeFilterModel extends ExcludeFilterModel<Ingredient, IngredientsFilter> {

}
