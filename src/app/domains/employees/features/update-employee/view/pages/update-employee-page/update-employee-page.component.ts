import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EmployeeStoreEntity} from "../../../../../data-access/model/employee-store-entity";
import {UpdateEmployeeFormComponent} from "../../components/update-employee-form/update-employee-form.component";
import {Location} from "@angular/common";
import {NotifyService} from "../../../../../../../shared/features/notify/data-access/services/notify.service";
import {UPDATE_EMPLOYEE_RESOLVER_KEY} from "../../../data-access/resolvers/update-employee.resolver";
import {MatDialogTitle} from "@angular/material/dialog";
import {EmployeeControllerService} from "../../../../../../../api/api/employeeController.service";
import {UpdateEmployee} from "../../../../../../../api/model/updateEmployee";

@Component({
  selector: 'app-update-employee-page',
  imports: [
    UpdateEmployeeFormComponent,
    MatDialogTitle
  ],
  templateUrl: './update-employee-page.component.html',
  styleUrl: './update-employee-page.component.scss'
})
export class UpdateEmployeePageComponent implements OnInit {
  private readonly employeeApi = inject(EmployeeControllerService);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);
  private readonly notify = inject(NotifyService);

  protected readonly $employee = signal<EmployeeStoreEntity | undefined>(undefined);

  ngOnInit() {
    const data = this.route.snapshot.data[UPDATE_EMPLOYEE_RESOLVER_KEY];
    this.$employee.set(data);
  }

  onSubmit(updateDto: UpdateEmployee) {
    this.employeeApi.updateEmployeeByUserId(this.$employee()!.id, updateDto)
      .pipe(
        this.notify.notifyHttpRequest()
      )
      .subscribe(() => {
        this.location.back();
      });
  }

  onCancel() {
    this.location.back();
  }
}
