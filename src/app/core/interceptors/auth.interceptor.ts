import {inject} from "@angular/core";
import {HttpErrorResponse, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {catchError, switchMap, throwError} from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken;

  if (token) {
    req = addAuthHeader(req, token);
  }

  return next(req)
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 && authService.refreshToken) {
          return authService.refreshSession$()
            .pipe(
              switchMap(newToken => {
                const retryRequest = addAuthHeader(req, newToken);
                return next(retryRequest);
              })
            )
        }

        return throwError(() => err);
      })
    );
};

function addAuthHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
