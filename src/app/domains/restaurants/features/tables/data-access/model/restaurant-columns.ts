import {Restaurant} from "../../../../../../api/model/restaurant";

export type RestaurantColumn = (keyof Omit<Restaurant, 'id'>);

export const RestaurantColumns: Record<RestaurantColumn, RestaurantColumn> = {
  address: 'address'
};
