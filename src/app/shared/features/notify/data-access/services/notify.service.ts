import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {catchError, EMPTY, Observable, tap} from "rxjs";
import {SuccessDialogComponent} from "../../view/components/success-dialog/success-dialog.component";
import {ErrorDialogComponent, ErrorDialogConfig} from "../../view/components/error-dialog/error-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  notifyHttpRequest<T>(successMessage?: string): (innerObservable: Observable<T>) => Observable<T> {
    return (innerObservable: Observable<T>) => {
      return innerObservable
        .pipe(
          this.notifySuccess(successMessage),
          this.notifyHttpError()
        );
    };
  }

  notifySuccess<T>(successMessage?: string): (innerObservable: Observable<T>) => Observable<T> {
    return (innerObservable: Observable<T>) => {
      return innerObservable
        .pipe(
          tap({
            next: () => this.openSuccessDialog(successMessage)
          })
        )
    };
  }

  /**
   * Completes instead of throwing error
   */
  notifyHttpError<T>(): (innerObservable: Observable<T>) => Observable<T> {
    return (innerObservable: Observable<T>) => {
      return innerObservable
        .pipe(
          catchError(error => {
            this.handleHttpError(error);
            return EMPTY;
          })
        )
    };
  }

  /**
   * Completes instead of throwing error
   */
  notifyError<T>(): (innerObservable: Observable<T>) => Observable<T> {
    return (innerObservable: Observable<T>) => {
      return innerObservable
        .pipe(
          catchError(error => {
            this.openErrorDialog({error});
            return EMPTY;
          })
        )
    };
  }

  private handleHttpError(error: any) {
    if (error && error instanceof HttpErrorResponse && error.status === 401) {
      const dialogRef = this.openErrorDialog({
        error: 'Помилка аутентифікації',
        btnLabel: 'Увійдіть у свій акаунт'
      });

      dialogRef.afterClosed()
        .subscribe(() => {
          this.router.navigate(['/', 'auth', 'login']);
        });
    } else {
      this.openErrorDialog({error});
    }
  }

  private openErrorDialog(config: ErrorDialogConfig) {
    return this.dialog.open<ErrorDialogComponent, ErrorDialogConfig>(ErrorDialogComponent, {
      data: config,
      minWidth: '400px'
    });
  }

  private openSuccessDialog(successMessage?: string) {
    return this.dialog.open(SuccessDialogComponent, {
      data: successMessage,
      minWidth: '400px'
    });
  }
}
