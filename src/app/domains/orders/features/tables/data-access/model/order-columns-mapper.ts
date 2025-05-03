import {ColumnMapperFn, ColumnsMapper} from "../../../../../../shared/features/reports/data-access/model/columns-mapper";
import {Order} from "../../../../../../api/model/order";

export class OrderColumnsMapper extends ColumnsMapper<Order> {
  protected override readonly mappers = new Map<keyof Order, ColumnMapperFn<Order>>([
    ['isCompleted', (isCompleted) => isCompleted ? 'Завершено' : 'В обробці']
  ]);
}
``
