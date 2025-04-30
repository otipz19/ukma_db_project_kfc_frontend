import {Order} from "../../../../api/model/order";
import {ClientStoreEntity} from "../../../clients/data-access/model/client-store-entity";
import {Restaurant} from "../../../../api/model/restaurant";
import {EmployeeStoreEntity} from "../../../employees/data-access/model/employee-store-entity";

export type ListOrderDto = Order
  & {
  restaurantAddress: Restaurant['address'],
  employeeSurname?: EmployeeStoreEntity['surname'],
  clientSurname?: ClientStoreEntity['surname']
};
