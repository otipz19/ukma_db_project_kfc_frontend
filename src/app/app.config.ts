import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideNativeDateAdapter} from "@angular/material/core";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {jwtTokenAuthInterceptor} from "./domains/auth/model/interceptors/jwt-token-auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([jwtTokenAuthInterceptor]))
  ]
};
