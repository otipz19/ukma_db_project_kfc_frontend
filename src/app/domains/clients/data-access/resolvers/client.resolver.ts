import {RedirectCommand, ResolveFn, Router} from "@angular/router";
import {inject} from "@angular/core";
import {ClientControllerService} from "../../../../api/api/clientController.service";
import {catchError, EMPTY, map} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {ClientStoreEntity, mapClientToStoreEntity} from "../model/client-store-entity";

export const CLIENT_RESOLVER_KEY = 'CLIENT_RESOLVER_KEY';

export const clientResolver: ResolveFn<ClientStoreEntity> = (route, state) => {
  const router = inject(Router);

  const clientId = Number(route.paramMap.get('clientId'));
  if (isNaN(clientId)) {
    return new RedirectCommand(router.parseUrl('not-found'));
  }

  const api = inject(ClientControllerService);
  return api.getClientByUserId(clientId)
    .pipe(
      map(client => {
        return mapClientToStoreEntity(client)
      }),
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 403) {
          router.navigate(['forbidden']);
        }
        router.navigate(['not-found']);
        return EMPTY;
      })
    );
};
