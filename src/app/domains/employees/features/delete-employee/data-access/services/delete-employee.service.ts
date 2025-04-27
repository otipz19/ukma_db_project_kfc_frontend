import {inject, Injectable} from "@angular/core";
import {DeleteDialogService} from "../../../../../../shared/features/delete-dialog/services/delete-dialog.service";
import {EmployeesStore} from "../../../../data-access/store/employees.store";
import {NotifyService} from "../../../../../../shared/features/notify/data-access/services/notify.service";
import {EmployeeStoreEntity} from "../../../../data-access/model/employee-store-entity";
import {Observable, switchMap} from "rxjs";
import {mapEmployeePositionToLabel} from "../../../../view/pipes/employee-position.pipe";
import {EmployeeControllerService} from "../../../../../../api/api/employeeController.service";

@Injectable({
  providedIn: 'root'
})
export class DeleteEmployeeService {
  private readonly deleteDialog = inject(DeleteDialogService);
  private readonly api = inject(EmployeeControllerService);
  private readonly store = inject(EmployeesStore);
  private readonly notify = inject(NotifyService);

  deleteEmployee(employee: EmployeeStoreEntity) {
    this.deleteEmployee$(employee)
      .subscribe(() => {
        this.store.remove(employee.id);
      });
  }

  deleteEmployee$(employee: EmployeeStoreEntity): Observable<void> {
    return this.deleteDialog.confirmDelete$({
      entityTypeName: mapEmployeePositionToLabel(employee.position),
      entityInstanceName: `${employee.surname} ${employee.firstName}`
    })
      .pipe(
        switchMap(() => {
          return this.api.fireEmployeeByUserId(employee.id);
        }),
        this.notify.notifyHttpRequest()
      );
  }
}
