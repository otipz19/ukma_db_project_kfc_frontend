import {catchError, map, Observable, of, switchMap, timer} from "rxjs";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";
import {CustomValidationErrorKey} from "../utils/get-validation-error-message";

export function buildExistsValidator(requestFn: () => Observable<boolean>, errorKey: CustomValidationErrorKey, debounceMs = 300): () => AsyncValidatorFn {
  return () => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return timer(debounceMs)
        .pipe(
          switchMap(() => {
            return requestFn();
          }),
          map(exists => {
            return exists ? {[errorKey]: {value: true}} : null;
          }),
          catchError(() => of({[errorKey]: {value: true}}))
        );
    };
  };
}
