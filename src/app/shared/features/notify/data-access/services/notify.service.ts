import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {catchError, EMPTY, map, Observable, switchMap, tap} from "rxjs";
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
          switchMap(innerObsRes => {
            const dialogRef = this.openSuccessDialog(successMessage);
            return dialogRef.afterClosed()
              .pipe(
                map(() => innerObsRes)
              );
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
            if (error && error instanceof HttpErrorResponse && error.status === 401) {
              const dialogRef = this.openErrorDialog({
                error: 'Помилка аутентифікації',
                btnLabel: 'Увійдіть у свій акаунт'
              });

              dialogRef.afterClosed()
                .subscribe(() => {
                  this.router.navigate(['/', 'auth', 'login']);
                });

              return EMPTY;
            } else {
              return this.openErrorDialog({error}).afterClosed()
                .pipe(
                  switchMap(() => EMPTY)
                );
            }
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
            const dialogRef = this.openErrorDialog({error});
            return dialogRef.afterClosed()
              .pipe(
                switchMap(() => EMPTY)
              )
          })
        )
    };
  }

  private openErrorDialog(config: ErrorDialogConfig) {
    return this.dialog.open<ErrorDialogComponent, ErrorDialogConfig, undefined>(ErrorDialogComponent, {
      data: config,
      minWidth: '400px'
    });
  }

  private openSuccessDialog(successMessage?: string) {
    return this.dialog.open<SuccessDialogComponent, string, undefined>(SuccessDialogComponent, {
      data: successMessage,
      minWidth: '400px',
    });
  }
}
