import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {UpsertDialogComponent, UpsertDialogData} from "../components/upsert-dialog/upsert-dialog.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpsertDialogService {
  private readonly matDialog = inject(MatDialog);

  openUpsert$<TViewDto extends object>(data: UpsertDialogData<TViewDto>): Observable<TViewDto | undefined> {
    const dialogRef = this.matDialog
      .open<UpsertDialogComponent<TViewDto>, UpsertDialogData<TViewDto>, TViewDto>(
        UpsertDialogComponent,
        {
          data: data,
          minWidth: '600px'
        }
      );

    return dialogRef.afterClosed();
  }
}
