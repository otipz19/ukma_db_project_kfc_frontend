import {ColumnMapperFn, ColumnsMapper} from "../../../../../../shared/features/reports/data-access/model/columns-mapper";
import {Meal} from "../../../../../../api/model/meal";

export class MealColumnsMapper extends ColumnsMapper<Meal> {
  protected override readonly mappers = new Map<keyof Meal, ColumnMapperFn<Meal>>([
    ['additionalPrice', (additionalPrice) => additionalPrice + ' грн'],
    ['price', (price) => price + ' грн'],
    ['weight', (weight) => weight + ' г'],
    ['energeticValue', (energeticValue) => energeticValue + ' ккал']
  ]);
}
