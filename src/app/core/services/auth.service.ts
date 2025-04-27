import {computed, inject, Injectable, signal} from "@angular/core";
import {AuthenticationControllerService} from "../../api/api/authenticationController.service";
import {catchError, EMPTY, map, Observable, switchMap, tap, throwError} from "rxjs";
import {voidOperator} from "../../shared/rxjs/operators/void-operator";
import {HttpContext, HttpErrorResponse} from "@angular/common/http";
import {SKIP_AUTH_INTERCEPTOR} from "../interceptors/auth.interceptor";
import {
  EmployeeStoreEntity,
  mapEmployeeToStoreEntity
} from "../../domains/employees/data-access/model/employee-store-entity";
import {Client} from "../../api/model/client";
import {ClientControllerService} from "../../api/api/clientController.service";
import {User, UserControllerService, UserRole} from "../../api";
import {EmployeeControllerService} from "../../api/api/employeeController.service";

type TokensDto = {
  accessToken: string,
  refreshToken: string
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly LS_KEY_TOKENS_DTO = "LS_KEY_TOKENS_DTO";

  private readonly authApi = inject(AuthenticationControllerService);
  private readonly userApi = inject(UserControllerService);
  private readonly clientApi = inject(ClientControllerService);
  private readonly employeeApi = inject(EmployeeControllerService);

  private _tokensDto: TokensDto | undefined;

  private readonly $currentUserInner = signal<User | undefined>(undefined);
  readonly $currentUser = this.$currentUserInner.asReadonly();

  readonly $isAuthenticated = computed(() => Boolean(this.$currentUser()));
  readonly $role = computed(() => this.$currentUser()?.role);
  readonly $isEmployee = computed(() => this.$role() !== 'CLIENT');

  private readonly $currentEmployeeInner = signal<EmployeeStoreEntity | undefined>(undefined);
  readonly $currentEmployee = this.$currentEmployeeInner.asReadonly();

  private readonly $currentClientInner = signal<Client | undefined>(undefined);
  readonly $currentClient = this.$currentClientInner.asReadonly();

  hasRole(...roles: UserRole[]): boolean {
    const role = this.$role();
    return Boolean(role && roles.includes(role));
  }

  login$(username: string, password: string): Observable<void> {
    return this.authApi.loginUser({username, password})
      .pipe(
        tap(({token, refreshToken}) => {
          this.setTokens(token, refreshToken);
        }),
        switchMap(() => this.setCurrentUser$()),
      );
  }

  restoreSession$(): Observable<void> {
    const fromLs = localStorage.getItem(AuthService.LS_KEY_TOKENS_DTO);
    if (!fromLs) {
      return EMPTY;
    }

    this._tokensDto = JSON.parse(fromLs);
    return this.setCurrentUser$();
  }

  private setCurrentUser$(): Observable<void> {
    return this.userApi.getCurrentUser()
      .pipe(
        tap(user => {
          this.$currentUserInner.set(user);
        }),
        switchMap(user => {
          if (user.role === 'CLIENT') {
            return this.setCurrentClient(user);
          } else {
            return this.setCurrentEmployee(user);
          }
        }),
        catchError(error => {
          // TODO: temporary workaround of session restoration by expired token
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return EMPTY;
          }
          return throwError(() => error);
        }),
        voidOperator()
      );
  }

  private setCurrentEmployee(user: User) {
    return this.employeeApi.getEmployeeByUserId(user.id)
      .pipe(
        tap(employee => {
          this.$currentEmployeeInner.set(mapEmployeeToStoreEntity(employee));
        })
      );
  }

  private setCurrentClient(user: User) {
    return this.clientApi.getClientByUserId(user.id)
      .pipe(
        tap(client => {
          this.$currentClientInner.set(client);
        })
      );
  }

  refreshSession$(): Observable<string> {
    const refreshToken = this.refreshToken;
    if (!refreshToken) {
      throw new Error('refreshSession was called without active session');
    }

    return this.authApi.resetToken(
      {refreshToken},
      'body',
      false,
      {context: new HttpContext().set(SKIP_AUTH_INTERCEPTOR, true)}
    )
      .pipe(
        map(({token}) => token),
        tap((accessToken) => {
          this.setTokens(accessToken, refreshToken);
        })
      )
  }

  closeSession() {
    this.clearTokens();
    this.$currentUserInner.set(undefined);
    this.$currentClientInner.set(undefined);
    this.$currentEmployeeInner.set(undefined);
  }

  get accessToken(): string | undefined {
    return this._tokensDto?.accessToken;
  }

  get refreshToken(): string | undefined {
    return this._tokensDto?.refreshToken;
  }

  private setTokens(accessToken: string, refreshToken: string) {
    this._tokensDto = {accessToken, refreshToken};
    localStorage.setItem(AuthService.LS_KEY_TOKENS_DTO, JSON.stringify(this._tokensDto));
  }

  private clearTokens() {
    localStorage.removeItem(AuthService.LS_KEY_TOKENS_DTO);
    this._tokensDto = undefined;
  }
}
