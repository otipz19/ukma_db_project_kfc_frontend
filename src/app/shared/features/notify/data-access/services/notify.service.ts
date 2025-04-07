import {inject, Injectable} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {Observable, Subscriber} from "rxjs";
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

  notifyHttpRequest(successMessage?: string): (innerObservable: Observable<any>) => Observable<any> {
    return (innerObservable: Observable<any>) => {
      return new Observable<any>((subscriber: Subscriber<any>) => {
        const innerSub = innerObservable.subscribe({
          next: val => subscriber.next(val),
          error: err => {
            this.handleHttpError(err);
            subscriber.error(err);
          },
          complete: () => {
            this.notifySuccess(successMessage);
            subscriber.complete();
          }
        });

        return () => {
          innerSub.unsubscribe();
        };
      });
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
    }

    this.notifyError(error);
  }

  notifyError(error?: any) {
    this.openErrorDialog({error});
  }

  private openErrorDialog(config: ErrorDialogConfig) {
    return this.dialog.open<ErrorDialogComponent, ErrorDialogConfig>(ErrorDialogComponent, {
      data: config,
      minWidth: '400px'
    });
  }

  notifySuccess(successMessage?: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: successMessage,
      minWidth: '400px'
    });
  }
}
