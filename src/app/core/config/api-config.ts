import {ApiModule, Configuration} from "../../api";
import {importProvidersFrom} from "@angular/core";

export class ApiConfig extends Configuration {
  constructor() {
    super({
      basePath: 'localhost:8080'
    });
  }
}

export const apiConfigProvider = importProvidersFrom(
  ApiModule.forRoot(() => new ApiConfig())
)
