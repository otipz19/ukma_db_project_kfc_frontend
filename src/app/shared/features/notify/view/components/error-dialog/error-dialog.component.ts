import {Component, inject, OnInit, signal} from '@angular/core';
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
  private static readonly DEFAULT_MSG = 'Сталася помилка...';

  private readonly dialogRef = inject(MatDialogRef<ErrorDialogComponent>);
  protected readonly config: ErrorDialogConfig | undefined = inject(MAT_DIALOG_DATA);

  protected readonly $errorMessage = signal<string>(ErrorDialogComponent.DEFAULT_MSG);

  ngOnInit() {
    const err = this.config?.error;
    if (err instanceof HttpErrorResponse) {
      this.$errorMessage.set(this.getHttpErrorMessage(err));
    } else {
      this.$errorMessage.set(this.getStringOrObject(err));
    }
  }

  private getHttpErrorMessage(response: HttpErrorResponse): string {
    const error = response.error;
    if (error.constructor === Array) {
      if (error.length === 0) {
        return ErrorDialogComponent.DEFAULT_MSG;
      }
      return this.getStringOrObject(error[0] as any);
    }
    return this.getStringOrObject(error);
  }

  private getStringOrObject(value: string | object): string {
    return typeof value === 'string' ? value : JSON.stringify(value);
  }

  protected onClose(): void {
    this.dialogRef.close();
  }
}
