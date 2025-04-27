import {CUSTOM_VALIDATION_ERROR_KEY} from "../utils/get-validation-error-message";
import {buildFormatValidator} from "./format-validator-builder";

export const phoneNumberFormatValidator = buildFormatValidator(
  /^\d{10}$/,
  CUSTOM_VALIDATION_ERROR_KEY.invalidPhoneFormat,
  'Приклад: +380952524949'
);
