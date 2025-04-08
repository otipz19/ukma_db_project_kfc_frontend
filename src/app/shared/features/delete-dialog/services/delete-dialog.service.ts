import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent, DeleteDialogData} from "../components/delete-dialog/delete-dialog.component";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DeleteDialogService {
  private readonly matDialog = inject(MatDialog);

  confirmDelete$(dialogData: DeleteDialogData): Observable<boolean> {
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
        // Cast undefined to boolean
        map(val => Boolean(val))
      );
  }
}
