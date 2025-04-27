import {CUSTOM_VALIDATION_ERROR_KEY} from "../utils/get-validation-error-message";
import {buildFormatValidator} from "./format-validator-builder";

export const emailFormatValidator = buildFormatValidator(
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  CUSTOM_VALIDATION_ERROR_KEY.invalidEmailFormat,
  'Приклад: example@mail.com'
);
