import {provideAppInitializer} from "@angular/core";
import {importFont} from "./Roboto-Regular-normal";

export const jspdfFontProvider = provideAppInitializer(() => {
  importFont();
});
