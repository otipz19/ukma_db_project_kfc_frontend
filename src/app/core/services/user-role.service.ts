import {inject, Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {toSignal} from "@angular/core/rxjs-interop";
import {BehaviorSubject, catchError, of, switchMap, tap} from "rxjs";
import {Client} from "../../api/model/client";
import {
  EmployeeStoreEntity,
  mapEmployeeToStoreEntity
} from "../../domains/employees/data-access/model/employee-store-entity";
import {ClientControllerService} from "../../api/api/clientController.service";
import {Employee, EmployeeControllerService} from "../../api";
import {User} from "../../api/model/user";

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  private readonly clientApi = inject(ClientControllerService);
  private readonly employeeApi = inject(EmployeeControllerService);

  private readonly authService = inject(AuthService);

  private readonly currentClientSubject$ = new BehaviorSubject<Client | undefined>(undefined);
  readonly currentUser$ = this.currentClientSubject$.asObservable();
  readonly $currentUser = toSignal(this.currentUser$);

  private readonly currentEmployeeSubject$ = new BehaviorSubject<EmployeeStoreEntity | undefined>(undefined);
  readonly currentEmployee$ = this.currentEmployeeSubject$.asObservable();
  readonly $currentEmployee = toSignal(this.currentEmployee$);

  constructor() {
    this.authService.currentUser$
      .pipe(
        switchMap(user => {
          if (!user) {
            return this.setNoRole();
          }

          if (user.role === "CLIENT") {
            return this.setCurrentClient$(user);
          }

          return this.setCurrentEmployee$(user);
        })
      )
      .subscribe();
  }

  private setNoRole() {
    return of(undefined)
      .pipe(
        tap(() => {
          this.emitNewUser(undefined, undefined);
        })
      );
  }

  private setCurrentClient$(user: User) {
    return this.clientApi.getClientByUserId(user.id)
      .pipe(
        tap(client => {
          this.emitNewUser(client, undefined);
        }),
        this.catchError()
      );
  }

  private setCurrentEmployee$(user: User) {
    return this.employeeApi.getEmployeeByUserId(user.id)
      .pipe(
        tap(employee => {
         this.emitNewUser(undefined, employee);
        }),
        this.catchError()
      );
  }

  private catchError() {
    return catchError(() => {
      this.emitNewUser(undefined, undefined);
      return of(undefined);
    });
  }

  private emitNewUser(client: Client | undefined, employee: Employee | undefined) {
    this.currentClientSubject$.next(client);
    const storeEntity = employee ? mapEmployeeToStoreEntity(employee) : undefined;
    this.currentEmployeeSubject$.next(storeEntity);
  }
}
