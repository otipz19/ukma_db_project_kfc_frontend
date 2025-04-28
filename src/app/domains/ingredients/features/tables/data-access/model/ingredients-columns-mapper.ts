import {ColumnMapperFn, ColumnsMapper} from "../../../../../../shared/features/reports/data-access/model/columns-mapper";
import {Ingredient} from "../../../../../../api/model/ingredient";

export class IngredientsColumnsMapper extends ColumnsMapper<Ingredient> {
  protected override readonly mappers = new Map<keyof Ingredient, ColumnMapperFn<Ingredient>>([
    ['price', (price) => price + ' грн'],
    ['weight', (weight) => weight + ' г'],
    ['energeticValue', (energeticValue) => energeticValue + ' ккал']
  ]);
}
