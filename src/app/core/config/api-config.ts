import {ApiModule, Configuration} from "../../api";
import {importProvidersFrom} from "@angular/core";

export class ApiConfig extends Configuration {
  constructor() {
    super({
      basePath: 'http://localhost:8080/KFC',
    });
  }
}

export const apiConfigProvider = importProvidersFrom(
  ApiModule.forRoot(() => new ApiConfig())
)
