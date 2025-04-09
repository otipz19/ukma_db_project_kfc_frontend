import {Ingredient} from "../../../../../api/model/ingredient";
import {
  OnePropertySubstringFilterModel
} from "../../../../../shared/features/filters/generic-filters/one-property-substring-filter-model";

export class TitleFilterModel extends OnePropertySubstringFilterModel<Ingredient> {
    protected override getProperty(entity: Ingredient): string {
        return entity.title;
    }
}
