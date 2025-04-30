import {ColumnMapperFn, ColumnsMapper} from "../../../../../../shared/features/reports/data-access/model/columns-mapper";
import {ListOrderDto} from "../../../../data-access/types/list-order-dto";

export class OrderColumnsMapper extends ColumnsMapper<ListOrderDto> {
  protected override readonly mappers = new Map<keyof ListOrderDto, ColumnMapperFn<ListOrderDto>>([
    ['isCompleted', (isCompleted) => isCompleted ? 'Завершено' : 'В обробці']
  ]);
}
``
