import {inject, Injectable} from "@angular/core";
import {EmployeeControllerService} from "../../../../../../api/api/employeeController.service";
import {NotifyService} from "../../../../../../shared/features/notify/data-access/services/notify.service";
import {UpsertDialogService} from "../../../../../../shared/features/upsert-dialog/services/upsert-dialog.service";
import {EmployeeStoreEntity} from "../../../../data-access/model/employee-store-entity";
import {Observable} from "rxjs";
import {
  UpdateEmployeeDataFormValue, UpdateEmployeeFormComponent
} from "../../view/components/update-employee-form/update-employee-form.component";

@Injectable({
  providedIn: 'root'
})
export class UpdateEmployeeService {
  private readonly upsertDialog = inject(UpsertDialogService);
  private readonly employeeApi = inject(EmployeeControllerService);
  private readonly notify = inject(NotifyService);

  update$(employee: EmployeeStoreEntity): Observable<void> {
    const {passportNumber, firstName, surname, middleName, birthDate} = employee;
    const formValue: UpdateEmployeeDataFormValue = {passportNumber, firstName, surname, middleName, birthDate};

    return this.upsertDialog.openUpsert$<UpdateEmployeeDataFormValue, void>({
      title: 'Редагування даних працівника',
      initialValue: formValue,
      formComponent: UpdateEmployeeFormComponent,
      submitCallback: updated => {
        return this.employeeApi.updateEmployeeByUserId(employee.id, {...updated, salary: employee.salary})
          .pipe(
            this.notify.notifyHttpRequest()
          );
      }
    })
  }
}
