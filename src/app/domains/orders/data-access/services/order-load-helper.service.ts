import {inject, Injectable} from "@angular/core";
import {ClientStoreEntity, mapClientToStoreEntity} from "../../../clients/data-access/model/client-store-entity";
import {RestaurantControllerService} from "../../../../api/api/restaurantController.service";
import {ClientControllerService} from "../../../../api/api/clientController.service";
import {EmployeeControllerService} from "../../../../api/api/employeeController.service";
import {map, Observable, of} from "rxjs";
import {NotifyService} from "../../../../shared/features/notify/data-access/services/notify.service";
import {Restaurant} from "../../../../api/model/restaurant";
import {
  EmployeeStoreEntity,
  mapEmployeeToStoreEntity
} from "../../../employees/data-access/model/employee-store-entity";

@Injectable({
  providedIn: 'root'
})
export class OrderLoadHelperService {
  private readonly restaurantsApi = inject(RestaurantControllerService);
  private readonly clientsApi = inject(ClientControllerService);
  private readonly employeeApi = inject(EmployeeControllerService);
  private readonly notify = inject(NotifyService);

  loadRestaurant$(id: Restaurant['id']): Observable<Restaurant> {
    return this.restaurantsApi.getRestaurantById(id)
      .pipe(
        this.notify.notifyError('Помилка завантаження інформації про ресторани'),
      );
  }

  loadRestaurants$(ids: Array<Restaurant['id']>): Observable<Restaurant[]> {
    return this.restaurantsApi.getRestaurantsByFilter()
      .pipe(
        this.notify.notifyError('Помилка завантаження інформації про ресторани'),
        map(list => {
          return list.items.filter(r => ids.includes(r.id))
        })
      );
  }

  loadClient$(id: ClientStoreEntity['id'] | undefined): Observable<ClientStoreEntity | undefined> {
    if (id == undefined) {
      return of(undefined);
    }

    return this.clientsApi.getClientByUserId(id)
      .pipe(
        this.notify.notifyError('Помилка завантаження інформації про клієнтів'),
        map(client => {
          return mapClientToStoreEntity(client);
        })
      );
  }


  loadClients$(ids: Array<ClientStoreEntity['id'] | undefined>): Observable<ClientStoreEntity[]> {
    const filteredIds = ids.filter(id => id != undefined);

    if (filteredIds.length === 0) {
      return of([]);
    }

    return this.clientsApi.getClientsByFilter()
      .pipe(
        this.notify.notifyError('Помилка завантаження інформації про клієнтів'),
        map(list => {
          const clients = list.items.filter(c => filteredIds.includes(c.userId));
          return clients.map(c => mapClientToStoreEntity(c));
        })
      );
  }

  loadEmployee$(id: EmployeeStoreEntity['id'] | undefined): Observable<EmployeeStoreEntity | undefined> {
    if (id == undefined) {
      return of(undefined);
    }

    return this.employeeApi.getEmployeeByUserId(id)
      .pipe(
        this.notify.notifyError('Помилка завантаження інформації про працівника'),
        map(employee => {
          return mapEmployeeToStoreEntity(employee);
        })
      );
  }

  loadEmployees$(ids: Array<EmployeeStoreEntity['id'] | undefined>): Observable<EmployeeStoreEntity[]> {
    const filteredIds = ids.filter(id => id != undefined);

    if (filteredIds.length === 0) {
      return of([]);
    }

    return this.employeeApi.getEmployeesByFilter()
      .pipe(
        this.notify.notifyError('Помилка завантаження інформації про працівників'),
        map(list => {
          const employees = list.items.filter(e => filteredIds.includes(e.userId));
          return employees.map(e => mapEmployeeToStoreEntity(e));
        })
      );
  }
}
