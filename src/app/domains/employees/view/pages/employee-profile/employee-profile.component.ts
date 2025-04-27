import {Component, inject, OnInit} from '@angular/core';
import {EmailsCardComponent} from "../../../../contacts/view/components/emails-card/emails-card.component";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {PhonesCardComponent} from "../../../../contacts/view/components/phones-card/phones-card.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {EmployeeProfileStore} from "../../../data-access/store/employee-profile.store";
import {getFromResolver} from "../../../../../shared/resolvers/get-from-resolver";
import {EMPLOYEE_RESOLVER_KEY} from "../../../data-access/resolvers/employee.resolver";
import {EmployeeStoreEntity} from "../../../data-access/model/employee-store-entity";
import {UserRole} from "../../../../../api";
import {AuthService} from "../../../../../core/services/auth.service";
import {EmployeePositionPipe} from "../../pipes/employee-position.pipe";
import {UpdateEmployeeService} from "../../../features/update-employee/data-access/services/update-employee.service";

@Component({
  selector: 'app-employees-profile',
  imports: [
    EmailsCardComponent,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatIcon,
    MatIconButton,
    PhonesCardComponent,
    EmployeePositionPipe
  ],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent implements OnInit {
  protected readonly authService = inject(AuthService);
  private readonly store = inject(EmployeeProfileStore);
  private readonly updateService = inject(UpdateEmployeeService);

  private readonly employeeFromResolver = getFromResolver<EmployeeStoreEntity>(EMPLOYEE_RESOLVER_KEY);
  protected readonly $employee = this.store.$employee;
  protected readonly $restaurant = this.store.$restaurant;

  ngOnInit() {
    this.store.load(this.employeeFromResolver);
  }

  protected readonly UserRole = UserRole;

  protected onDelete() {
    // const client = this.$client();
    // if(!client) {
    //   return;
    // }
    // this.clientDeleteService.deleteClient$(client)
    //   .subscribe(() => {
    //     if (this.authService.hasRole(UserRole.CLIENT)) {
    //       this.authService.unLogin();
    //     } else {
    //       this.location.back();
    //     }
    //   });
  }

  protected onEdit() {
    const employee = this.$employee();
    if(!employee) {
      return;
    }
    this.updateService.update$(employee)
      .subscribe(() => {
        this.store.reloadData();
      });
  }
}
