import {Component, inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {HttpErrorResponse} from "@angular/common/http";

export type ErrorDialogConfig = {
  error?: any,
  title?: string,
  btnLabel?: string
};

@Component({
  selector: 'app-error-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent implements OnInit {
  private readonly dialogRef = inject(MatDialogRef<ErrorDialogComponent>);
  protected readonly config: ErrorDialogConfig | undefined = inject(MAT_DIALOG_DATA);

  protected errorMessage = 'Сталася помилка...';

  ngOnInit() {
    const err = this.config?.error;
    if(err instanceof HttpErrorResponse) {
      this.errorMessage = err.error;
    } else {
      this.errorMessage = typeof err === 'string' ? err : JSON.stringify(err);
    }
  }

  protected onClose(): void {
    this.dialogRef.close();
  }
}
