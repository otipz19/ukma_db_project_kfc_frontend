import {buildFormatValidator} from "./format-validator-builder";
import {CUSTOM_VALIDATION_ERROR_KEY} from "../utils/get-validation-error-message";

export const passportNumberFormatValidator = buildFormatValidator(
  /^\d{14}$/,
  CUSTOM_VALIDATION_ERROR_KEY.invalidPassportFormat,
  'Приклад: 11223344556677'
);
