import {inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

export function getFromResolver<T>(key: string): T {
  const activatedRoute = inject(ActivatedRoute);
  return activatedRoute.snapshot.data[key] as T;
}
