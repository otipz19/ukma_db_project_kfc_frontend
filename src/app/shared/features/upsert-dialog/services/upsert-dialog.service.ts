import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {UpsertDialogComponent, UpsertDialogData} from "../components/upsert-dialog/upsert-dialog.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpsertDialogService {
  private readonly matDialog = inject(MatDialog);

  openUpsert$<TFormValue extends object>(data: UpsertDialogData<TFormValue>): Observable<void> {
    const dialogRef = this.matDialog
      .open<UpsertDialogComponent<TFormValue>, UpsertDialogData<TFormValue>, void>(
        UpsertDialogComponent,
        {
          data: data,
          width: '600px'
        }
      );

    return dialogRef.afterClosed();
  }
}
