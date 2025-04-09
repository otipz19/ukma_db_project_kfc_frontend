import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent, DeleteDialogData} from "../components/delete-dialog/delete-dialog.component";
import {Observable, takeWhile} from "rxjs";
import {voidOperator} from "../../../rxjs/operators/void-operator";

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {
  private readonly matDialog = inject(MatDialog);

  confirmDelete$(dialogData: DeleteDialogData): Observable<void> {
    const dialogRef = this.matDialog
      .open<DeleteDialogComponent, DeleteDialogData, boolean>(
        DeleteDialogComponent,
        {
          data: dialogData,
          minWidth: '500px'
        }
      );

    return dialogRef.afterClosed()
      .pipe(
        takeWhile(isConfirmed => Boolean(isConfirmed)),
        voidOperator()
      );
  }
}
