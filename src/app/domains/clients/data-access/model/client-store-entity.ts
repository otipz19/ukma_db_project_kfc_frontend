import {Client} from "../../../../api/model/client";
import {mapDateFromArrayResponse} from "../../../employees/data-access/model/employee-store-entity";

export type ClientStoreEntity = Omit<Client, 'userId'> & { id: number };

export function mapClientToStoreEntity(client: Client): ClientStoreEntity {
  let {userId, birthDate, ...rest} = client;
  birthDate = mapDateFromArrayResponse(birthDate as any);
  return {id: userId, birthDate, ...rest};
}
