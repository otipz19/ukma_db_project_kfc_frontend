import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {
  EmployeeCreateDialogComponent
} from "../../view/components/employee-create-dialog/employee-create-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class CreateEmployeeService {
  private readonly matDialog = inject(MatDialog);

  // TODO: Change to Observable if possible bug with table rerender appears
  create(): void {
    const dialogRef = this.matDialog
      .open<EmployeeCreateDialogComponent, void, void>(EmployeeCreateDialogComponent, {
        minWidth: '600px'
      });
  }
}
